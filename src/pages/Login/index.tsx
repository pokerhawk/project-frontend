import { FormWrapper, SignPageWrapper } from "../../styles/Global";
import MailIcon from "../../assets/images/icons/MailIcon";
import Button from "../../components/Button";
import FormHeader from "../../components/FormHeader";
import InputStringField from "../../components/InputStringField";
import * as S from './styles';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import AlertIcon from "../../assets/images/icons/AlertIcon";
import { useEffect, useState } from "react";
import EyeIcon from "../../assets/images/icons/EyeIcon";
import EyeOffIcon from "../../assets/images/icons/EyeOffIcon";
import Toastify from "../../components/Toastify/Toastify";
import { notify } from "../../utils/Toast/notify";
import Modal from "../../components/Modal";
import QRCode from "react-qr-code";

type Login = {
    email: string;
    password: string;
    code: string;
}

const loginSchema = yup.object({
    email: yup.string().email('Email inválido!').required('Email necessário para login!'),
    password: yup.string().required('Senha necessária para login!'),
    code: yup.string().required('Código de 6 digitos')
});

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({email: '',password: ''});
    const [qrCode, setQrCode] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isMfaEnabled, setIsMfaEnabled] = useState(false);
    const [isQrcodeModalOpen, setIsQrcodeModalOpen] = useState(false);
    const [isInputLoaded, setIsInputLoaded] = useState(false);

    const { login, checkMfaCode } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<Login>({
        resolver: yupResolver(loginSchema)
    });

    const handleLogin = handleSubmit(async ({ email, password, code }) => {
        try {
            await login({ email, password, code });
        } catch (err: any) {
            notify('error', `Dados inválidos, tente novamente!`)
        }
    })

    const handle2faVerification = async () =>{
        if(!isMfaEnabled){
            try {
                const response = await checkMfaCode(loginInfo.email);
                setIsMfaEnabled(response.mfaEnabled)
                setQrCode(response.qrcode)
                response.mfaEnabled?setIsQrcodeModalOpen(false):setIsQrcodeModalOpen(true)
            } catch(err:any){
                notify('error', err.response.data.message);
                throw err;
            }
        }
    }

    const closeModal = () =>{
        setIsQrcodeModalOpen(false)
    }

    useEffect(()=>{
        if(isMfaEnabled){
            delete errors.code
            delete errors.password
            setIsInputLoaded(true)
        }
    }, [isMfaEnabled]);

    return (
        <SignPageWrapper>
            <FormWrapper>
                <S.Wrapper>
                    <Toastify position='top-right' theme='light' displayTime={2500}/>
                    <S.HeaderWrapper>
                        <FormHeader
                            title={"Entre com sua conta"}
                            subtitle={"Faça seu login"}
                        />
                    </S.HeaderWrapper>
                    <S.Form onSubmit={handleLogin}>
                        <S.InputFormWrapper>
                            <InputStringField
                                label="Email"
                                type="text"
                                placeholder="Digite seu email"
                                iconRight={errors.email ? <AlertIcon /> : <MailIcon/>}
                                error={errors.email?.message}
                                inputError={errors.email ? true : false}
                                {...register('email')}
                                onChange={(e)=>{setLoginInfo({email: e.target.value, password: loginInfo.password})}}
                            />
                            {isInputLoaded && (
                                <>
                                    <InputStringField
                                        label="Senha"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        iconRight={isPasswordVisible? <div onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}><EyeOffIcon/></div> : <div onClick={()=>setIsPasswordVisible(!isPasswordVisible)}><EyeIcon/></div>}
                                        placeholder="Digite sua senha"
                                        error={errors.password?.message}
                                        inputError={errors.password? true:false}
                                        {...register('password')}
                                        onChange={(e)=>{setLoginInfo({email:loginInfo.email, password: e.target.value})}}
                                    />
                                    <InputStringField
                                        label="Código de autenticação"
                                        type="number"
                                        placeholder="123456"
                                        {...register('code')}
                                        error={errors.code?.message}
                                        inputError={errors.code? true:false}
                                        onKeyDown={(e)=>{e.key === 'Enter'?handleLogin():undefined}}
                                    />
                                    <Button socialButton type="submit">Login</Button>
                                </>
                            )}
                            <Modal
                                title={"Escaneie o QR Code"}
                                isOpen={isQrcodeModalOpen}
                                closeModal={closeModal}
                                children={
                                    <QRCode 
                                        value={qrCode}
                                        size={512}
                                        // style={{ height: "auto", maxWidth: "75%", width: "75%" }}
                                        // viewBox={`0 0 256 256`}
                                    />
                                }
                            />
                            {!isMfaEnabled && (
                                <Button socialButton onClick={handle2faVerification}>Próximo</Button>
                            )}
                        </S.InputFormWrapper>
                    </S.Form >
                    <S.SignupOptionWrapper>
                        <p>Não possui uma conta?</p>
                        <Link to='/register'>Faça o Cadastro</Link>
                    </S.SignupOptionWrapper>
                </S.Wrapper>
            </FormWrapper>
        </SignPageWrapper>
    );
}

export default Login;

import { FormWrapper, SignPageWrapper } from "../../styles/Global";
import MailIcon from "../../assets/images/icons/MailIcon";
import Button from "../../components/Button";
import FormHeader from "../../components/FormHeader";
import InputStringField from "../../components/InputStringField";
import * as S from './styles';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import AlertIcon from "../../assets/images/icons/AlertIcon";
import { useState } from "react";
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
    code: yup.string().required('Formato incorreto').length(6, "Apenas 6 digitos")
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isMfaEnabled, setIsMfaEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Login>({
        resolver: yupResolver(loginSchema)
    });
    const { login, checkMfaCode } = useAuth();

    const handleLogin = handleSubmit(async ({ email, password, code }) => {
        try {
            await login({ email, password, code });
        } catch (err: any) {
            notify('error', `Dados inválidos, tente novamente!`)
        }
    })

    const handle2faVerification = async () =>{
        try {
            const { mfaEnabled, qrcode } = await checkMfaCode(email);
            setIsMfaEnabled(mfaEnabled)
            setQrCode(qrcode)
            mfaEnabled?setIsModalOpen(false):setIsModalOpen(true)
        } catch(err){
            throw err;
        }
    }

    const closeModal = () =>{
        setIsModalOpen(false)
        setIsMfaEnabled(false)
    }

    return (
        <SignPageWrapper>
            <FormWrapper>
                <S.Wrapper>
                    <Toastify position='top-right' theme='light' displayTime={2500}/>
                    <S.HeaderWrapper>
                        { !isMfaEnabled && (
                            <FormHeader
                                title={"Entre com sua conta"}
                                subtitle={"Faça seu login"}
                            />
                        )}
                        { isMfaEnabled && (
                            <FormHeader
                                title={"Insira seu código de autenticação"}
                                subtitle={"Pegue o código no seu app de autenticação"}
                            />
                        )}
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
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <InputStringField
                                label="Senha"
                                type={isPasswordVisible ? 'text' : 'password'}
                                iconRight={isPasswordVisible? <div onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}><EyeOffIcon/></div> : <div onClick={()=>setIsPasswordVisible(!isPasswordVisible)}><EyeIcon/></div>}
                                placeholder="Digite sua senha"
                                error={errors.password?.message}
                                inputError={errors.password ? true : false}
                                {...register('password')}
                            />
                            { isMfaEnabled && (
                                <>
                                    <InputStringField
                                        label="Codigo de autenticação"
                                        type="number"
                                        placeholder="Digite seu código de autenticação"
                                        error={errors.code?.message}
                                        inputError={errors.code ? true : false}
                                        {...register('code')}
                                    />
                                    <Button socialButton type="submit">Verificar código</Button>
                                </>
                            )}
                            <Modal
                                title={"Autenticador de 2 fatores"}
                                isOpen={isModalOpen}
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
                            { !isMfaEnabled && (
                                <Button socialButton onClick={handle2faVerification}>Login</Button>
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

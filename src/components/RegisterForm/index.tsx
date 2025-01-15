import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import FormHeader from "../FormHeader";
import InputStringField from "../InputStringField";
import * as S from './styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import AlertIcon from "../../assets/images/icons/AlertIcon";
import HelpIcon from "../../assets/images/icons/HelpIcon";
import MailIcon from "../../assets/images/icons/MailIcon";
import { registerRequest } from "../../services/auth";
import Toastify from '../../components/Toastify/Toastify';
import { notify } from "../../utils/Toast/notify";

type InputProps = {
    name: string;
    email: string;
    password: string;
    zipcode: string;
    number: string;
    complement?: string;
}

const registerSchema = yup.object({
    name: yup.string().required('Nome de usuário necessário para cadastro!'),
    email: yup.string().email('Email inválido').required('Email é necessário para cadastro!'),
    password: yup.string().matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "A senha deve conter ao menos 1 carater especial, 1 letra maiúscula, 1 letra minúscula e 1 número").required('Senha é necessário para cadastro!'),
    zipcode: yup.string().required("CEP de residencia"),
    number: yup.string().required(),
    complement: yup.string()
})

const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InputProps>({
        resolver: yupResolver(registerSchema)
    });

    const signUp = async ({ name, email, password, zipcode, number, complement }: InputProps) => {
        const response = await registerRequest({ email, name, password, zipcode, number, complement });
        notify('success', response)
        setTimeout(()=>{navigate('/login')}, 2500);
    }

    return (
        <S.FormWrapper>
            <Toastify position='top-right' theme='light' displayTime={2500}/>
            <S.Form onSubmit={handleSubmit(signUp)}>
                <S.HeaderWrapper>
                    <FormHeader title="Cadastro" subtitle="Insira as informações" />
                </S.HeaderWrapper>
                <S.InternalFormWrapper>
                    <S.InputWrapper>
                        <InputStringField
                            label="Nome"
                            type="text"
                            placeholder="Nome"
                            error={errors.name?.message}
                            inputError={errors.name ? true : false}
                            {...register('name')}
                        />
                        <InputStringField
                            label="Email"
                            type="text"
                            placeholder="e-mail"
                            iconLeft={<MailIcon />}
                            iconRight={errors.email ? <AlertIcon /> : <HelpIcon />}
                            error={errors.email?.message}
                            inputError={errors.email ? true : false}
                            {...register('email')}
                        />
                        <InputStringField
                            label="Senha"
                            type="password"
                            placeholder="Senha"
                            error={errors.password?.message}
                            inputError={errors.password ? true : false}
                            {...register('password')}
                        />
                        <InputStringField
                            label="CEP"
                            type="number"
                            placeholder="01000-000"
                            error={errors.zipcode?.message}
                            inputError={errors.zipcode ? true : false}
                            {...register('zipcode')}
                        />
                        <InputStringField
                            label="Numero"
                            type="number"
                            placeholder="Numero"
                            error={errors.number?.message}
                            inputError={errors.number ? true : false}
                            {...register('number')}
                        />
                        <InputStringField
                            label="Complemento"
                            type="text"
                            placeholder="Casa branca"
                            error={errors.complement?.message}
                            inputError={errors.complement ? true : false}
                            {...register('complement')}
                        />
                    </S.InputWrapper>
                    <S.ButtonWrapper>
                        <Button socialButton>Cadastrar</Button>
                    </S.ButtonWrapper>
                </S.InternalFormWrapper>
                <S.SignInOptionWrapper>
                <p>Já possui uma conta?</p>
                <Link to='/login'>Login</Link>
                </S.SignInOptionWrapper>
            </S.Form>
        </S.FormWrapper>
    );
}

export default RegisterForm;

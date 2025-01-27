import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Button from '../../components/Button';
import InputStringField from '../../components/InputStringField';
import * as S from './styles'
import { useEffect, useState } from "react";
import { SimpleRowWrapper } from "../../styles/Global";
import { maskPhone, unmaskPhone } from "../../utils/format/phone";
import Toastify from '../../components/Toastify/Toastify';
import { notify } from "../../utils/Toast/notify";
import { getUsers, updateUser } from '../../services/user';

const Settings = () => {
    const [user, setUser] = useState<any>({});
    const [address, setAddress] = useState(Object);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        zipcode: "",
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
        birthDate: ""
    })

    const getUserData = async() => {
        const res = await getUsers();
        setUser(res)
    };

    const handleSubmit = async(event:Event) =>{
        try {
            event.preventDefault();
            const response = await updateUser(userData);
            notify('success', response.message);
            setTimeout(()=>{window.location.reload()}, 2000);
        } catch (err: any) {
            notify("error", "Algo deu errado, tente novamente!");
        }
    }

    const handleBlur = async (e:any) =>{
        const cep = e.target.value
        const url =`https://viacep.com.br/ws/${cep}/json/`

        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('CEP inválido')
            }
            const data = await response.json();
            setAddress(data)
            setUserData((prevState)=>({
                ...prevState,
                address: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }))
        } catch (error) {
            notify("error", "Algo deu errado!")
            console.error(error)
        }
    }

    useEffect(()=>{
        getUserData();
    }, [])

    return (
        <PageWrapper smallGap>
            <Header/>
            <Toastify position='top-right' theme='light' displayTime={2000}/>
            <S.Wrapper>
                <S.HeaderWrapper>
                    <h1>Account Settings</h1>
                </S.HeaderWrapper>
                <S.Form onSubmit={handleSubmit}>
                    <InputStringField
                        label="Nome Completo"
                        type="text"
                        placeholder={user.name}
                        onChange={(e)=>{
                            setUserData((prevState)=>({
                                ...prevState,
                                name: e.target.value
                            }))
                        }}
                    />
                    <InputStringField
                        label="E-mail"
                        type="text"
                        placeholder={user.email}
                        onChange={(e)=>{
                            setUserData((prevState)=>({
                                ...prevState,
                                email: e.target.value
                            }))
                        }}
                    />
                    <InputStringField
                        label="Password"
                        type="password"
                        placeholder={"****"}
                        onChange={(e)=>{
                            setUserData((prevState)=>({
                                ...prevState,
                                password: e.target.value
                            }))
                        }}
                    />
                    <SimpleRowWrapper>
                        <InputStringField
                            label="Telefone"
                            type="text"
                            placeholder={user.phone?`${maskPhone(user.phone)}`:'(99) 9.9999-9999'}
                            onChange={(e)=>{
                                e.target.value = maskPhone(e.target.value)
                                setUserData((prevState)=>({
                                    ...prevState,
                                    phone: unmaskPhone(e.target.value)
                                }))
                            }}
                        />
                        <InputStringField
                            label="CEP"
                            type="text"
                            placeholder={user.zipcode?user.zipcode:"Somente números"}
                            onBlur={handleBlur}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    zipcode: e.target.value
                                }))
                            }}
                        />
                    </SimpleRowWrapper>
                    <hr/>
                    <SimpleRowWrapper>
                        <InputStringField
                            label="Endereço"
                            type="text"
                            placeholder={user.address?user.address:'Rua/Avenida...'}
                            value={address.logradouro}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    address: e.target.value
                                }))
                            }}
                        />
                        <InputStringField
                            label="Número"
                            type="text"
                            placeholder={user.number?user.number:'205'}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    number: e.target.value
                                }))
                            }}
                        />
                    </SimpleRowWrapper>
                    <SimpleRowWrapper>
                        <InputStringField
                            label="Bairro"
                            type="text"
                            value={address.bairro}
                            placeholder={user.neighborhood}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    neighborhood: e.target.value
                                }))
                            }}
                        />
                        <InputStringField
                            label="Cidade"
                            type="text"
                            value={address.localidade}
                            placeholder={user.city}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    city: e.target.value
                                }))
                            }}
                        />
                        <InputStringField
                            label="Estado"
                            type="text"
                            value={address.uf}
                            placeholder={user.state}
                            onChange={(e)=>{
                                setUserData((prevState)=>({
                                    ...prevState,
                                    state: e.target.value
                                }))
                            }}
                        />
                    </SimpleRowWrapper>
                    <InputStringField
                        label="Complemento"
                        type="text"
                        placeholder="Apartamento, Bloco, etc"
                        onChange={(e)=>{
                            setUserData((prevState)=>({
                                ...prevState,
                                complement: e.target.value
                            }))
                        }}
                    />
                    <hr/>
                    <InputStringField
                        label="Data de Nascimento"
                        type="date"
                        onChange={(e)=>{
                            setUserData((prevState)=>({
                                ...prevState,
                                birthDate: e.target.value
                            }))
                        }}
                    />
                    <Button socialButton type='submit'>Atualizar dados</Button>
                </S.Form>
            </S.Wrapper>
        </PageWrapper>
    );
}

export default Settings;

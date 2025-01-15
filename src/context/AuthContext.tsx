import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, isMfaEnabledRequest, loginRequest } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../services/user";
import { TUserPayload } from "../types/userPayloads.type";

type LoginProps = {
    email: string;
    password: string;
    code: string;
}

type UserProps = {
    email: string;
}

type CheckMfaCodeResponseProps = {
    mfaEnabled: boolean;
    qrcode: string;
}

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: LoginProps) => Promise<void>;
    checkMfaCode: (email:string) => Promise<CheckMfaCodeResponseProps>;
    logOut: () => void;
    user: UserProps
}

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
    children: ReactNode
}

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserProps>({ email: '' });
    const [loading, setLoading] = useState(false);

    // const defineUser = async () => {
    //     const { [COOKIE_ACCESS_TOKEN]: token } = parseCookies();
    //     const tokenDecoded = jwtDecode<TUserPayload>(token);
    //     const res = await getUser({ id: tokenDecoded.sub });

    //     setUser({
    //         email: res.email
    //     });
    // }

    const login = async ({ email, password, code }: LoginProps) => {
        setLoading(true);
        try {
            const { userId, type, access_token, refresh_token } = await loginRequest({ email, password, code });

            if(access_token){
                setCookie(null, COOKIE_ACCESS_TOKEN, access_token);
                setCookie(null, COOKIE_REFRESH_TOKEN, refresh_token);
                setIsAuthenticated(true);

                navigate(`/${type}/${userId}`);
            }
            throw Error;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const checkMfaCode = async (email: string) =>{
        try {
            const { mfaEnabled, qrcode } = await isMfaEnabledRequest(email)
            return {
                mfaEnabled,
                qrcode: qrcode?qrcode:''
            }
        } catch (err){
            throw err
        }
    }

    const logOut = () => {
        setIsAuthenticated(false);
        destroyCookie(null, COOKIE_ACCESS_TOKEN)
        destroyCookie(null, COOKIE_REFRESH_TOKEN, { path: '/' });
        navigate('/login');
    }

    useEffect(() => {
        // defineUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                checkMfaCode,
                logOut,
                user,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

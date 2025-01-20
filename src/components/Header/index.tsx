import Button from "../Button";
import TurnBackIcon from "../../assets/images/icons/TurnBackIcon";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as S from './styles'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id, type} = useParams();
    const { logOut } = useAuth();

    return (
        <S.HeaderWrapper>
            <S.NavBar>
                <S.A href="" onClick={()=>{navigate(`/${type}/${id}`)}}>Home</S.A>
                <S.A href="/About">About</S.A>
                <S.A href="/Help">Help</S.A>
            </S.NavBar>
            <h1>Project-Frontend img</h1>
            {location.pathname != `/${type}/${id}` ? 
            <Button leftIcon={<TurnBackIcon />} onClick={() => history.back()} returnButton>Voltar</Button>
            :
            <Button leftIcon={<TurnBackIcon />} onClick={() => logOut()} returnButton>LogOut</Button>
            }
        </S.HeaderWrapper>
    );
}

export default Header;

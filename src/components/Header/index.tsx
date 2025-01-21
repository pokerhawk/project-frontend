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
    const currentPage = (path: string): boolean => location.pathname === path;

    return (
        <S.HeaderWrapper>
            <S.NavBar>
                <S.A isCurrentPage={currentPage(`/${type}/${id}`)} href="" onClick={()=>{navigate(`/${type}/${id}`)}}>Home</S.A>
                <S.A isCurrentPage={currentPage("/about")} href="/about">About</S.A>
                <S.A isCurrentPage={currentPage("/help")} href="/help">Help</S.A>
                <S.A isCurrentPage={currentPage("/settings")} href="/settings">Settings</S.A>
            </S.NavBar>
            {location.pathname != `/${type}/${id}` ? 
            <Button leftIcon={<TurnBackIcon />} onClick={() => history.back()} returnButton>Back</Button>
            :
            <Button leftIcon={<TurnBackIcon />} onClick={() => logOut()} logoutButton>Logout</Button>
            }
        </S.HeaderWrapper>
    );
}

export default Header;

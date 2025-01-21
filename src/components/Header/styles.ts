import styled from "styled-components";
import theme from "../../styles/styled-theme";

interface AProps {
    isCurrentPage: boolean;
}

export const HeaderWrapper = styled.header `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5vh 1vw;
    border-radius: 0px 0px 25px 25px;
    box-shadow: 0 1vh 0.5vh rgba(0, 0, 0, 0.5);
    background: ${theme.color.foreground};
`;

export const NavBar = styled.nav `
    display: flex;
    gap: 1vw;
`;

export const A = styled.a<AProps> `
    display: flex;
    padding: 10px 15px 10px 15px;
    border-radius: 10px;
    color: ${theme.color.white};
    border: 1px solid ${theme.color.gray};
    background: ${(prop)=>(prop.isCurrentPage ? theme.color.gray: '')};
    text-decoration: none;
    &:hover {
        background: ${theme.color.blue};
    }
`;

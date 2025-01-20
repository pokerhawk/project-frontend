import styled from "styled-components";
import theme from "../../styles/styled-theme";

export const HeaderWrapper = styled.header `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5vh 1vw;
    border-radius: 0px 0px 25px 25px;
    box-shadow: 0 1vh 0.5vh rgba(0, 0, 0, 0.5);
    background: ${theme.color.default};
`;

export const NavBar = styled.nav `
    display: flex;
    gap: 1vw;
`;

export const A = styled.a `
    display: flex;
`;

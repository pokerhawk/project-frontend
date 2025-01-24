import styled, { createGlobalStyle, css } from "styled-components";
import media from "styled-media-query";
import theme from "./styled-theme";

type PageWrapperProps = {
    smallGap?: boolean;
    bigGap?: boolean;
}

export const GlobalStyles = createGlobalStyle`
    ${({ theme }) => css`
        * {
            font-family: ${theme.font.family.JosefinSans};
            font-size: ${theme.font.sizes};
            /* background-color: ${theme.color.background}; */
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        input[type=number] {
            -moz-appearance: textfield;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
    `}
`;

export const PageWrapper = styled.div<PageWrapperProps> `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${(prop)=>(prop.smallGap?'1vh':prop.bigGap?'5vh':'3vh')};
    width: 100%;
    height: 100%;
`;

export const SignPageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    ${media.lessThan("medium")`
        padding: 8px;
    `}
`;

export const FormWrapper = styled.div`
    width: 420px;
    padding-top: 32px;

    ${media.lessThan("small")`
        width: 350px;
        margin: 8px 16px;   
    `}
`;

export const ComponentWrapper = styled.div`
    display: flex;
`;

export const CardWrapper = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5vw;
    background: #FBFBFF;
`;

export const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    position: relative;
    right: 0;
    padding-right: 50px;
    padding-top: 100px;
`

export const SimpleColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;

`

export const SimpleRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 2px;
    gap: 10px;
`

export const CenteredWrapper = styled.div `
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    gap: 1vh;
    margin: 20px auto;
    padding: 20px;
    background-color: #e6e6e6;
    background-color: ${theme.color.lightGray};
    border-radius: 10px;
    box-shadow: 1vh 1vh 0.5vh rgba(0, 0, 0, 0.5);
`

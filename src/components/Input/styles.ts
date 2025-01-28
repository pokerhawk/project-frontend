import styled, { DefaultTheme, css } from "styled-components";
import theme from "../../styles/styled-theme";
import { TInputProperties } from ".";

export const inputWrapperModifiers = {
    inputError: (theme: DefaultTheme) => css`
        border: 1px solid ${theme.color.error};
    `,

    inputSearch: () => css`
        background: white;
        padding: 0;
        border: 1px solid ${theme.color.lightGray};
        &>input {
            width: 80%;
            height: 1.5vh;
        }
    `

}

type InputProps = 'inputError' | 'inputSearch';

export type InputWrapperProps = {} & Pick<TInputProperties, InputProps>;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    height: 100%;
    padding: 5px;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
    ${({ theme, inputError, inputSearch }) => css`
        display: flex;
        align-items: center;
        height: 3vh;
        border-radius: 8px;

        ${!!inputError && inputWrapperModifiers.inputError(theme)}
        ${!!inputSearch && inputWrapperModifiers.inputSearch()}
    `}
    border: 1px solid ${theme.color.darkGray};
`;

export const Input = styled.input`
    display: flex;
    border: none;
    font-size: ${theme.font.sizes.medium};
    padding-left: 10px;
    &:focus{
        outline: none;
        background-color: ${theme.color.white}
    }
`;

export const Icon = styled.i`
    display: flex;
    justify-self: flex-end;
    width: auto;
    height: auto;
`;

export const Error = styled.p`
    font-style: normal;

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    
    margin: 0;
    
    color: ${theme.color.error};
`;

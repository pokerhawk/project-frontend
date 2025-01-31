import styled, { DefaultTheme, css } from 'styled-components';
import { ButtonProps } from '.';
import media from 'styled-media-query';
import theme from '../../styles/styled-theme';

export const buttonModifiers = {
    socialButton: (theme: DefaultTheme) => css`
        padding: 5px 5px;
        background-color: ${theme.color.blue};
        color: ${theme.color.white};
        border: 1px solid ${theme.color.blue};
    `,

    textButton: (theme: DefaultTheme) => css`
        background-color: ${theme.color.white};
        color: ${theme.color.purple};
        border: none;
        width: auto;
        height: auto;

        ${media.lessThan('small')`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}
    `,

    titleButton: (theme: DefaultTheme) => css`
    background-color: ${theme.color.white};
    color: ${theme.color.blue};
    border: none;
    width: auto;
    height: auto;
    text-decoration: underline;

        ${media.lessThan('small')`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        `}
    `,

    reportButton: () => css`
        width: fit-content;
        height: 30px;
        padding: 10px 4px;
        border-width: 0;
        gap: 10px;
        background: ${theme.color.blue};
        color: ${theme.color.white};
        font-size: 15px;
    `,

    logoutButton: () => css`
        height: 35px;
        width: 100px;
        gap: 5px;
        color: ${theme.color.white};
        font-size: 16px;
        background-color: ${theme.color.logoutRed};
        border : 1px solid ${theme.color.gray};
        &:hover {
            border: 1px solid ${theme.color.lossRed};
        }
    `,

    returnButton: () => css`
        height: 34px;
        width: 100px;
        gap: 5px;
        color: ${theme.color.white};
        font-size: 16px;
        background-color: ${theme.color.gray};
        border : 1px solid ${theme.color.gray};
        &:hover {
            border: 1px solid ${theme.color.blue};
        }
    `,

    commomButton: () => css`
        border: 1px solid ${theme.color.black};
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        gap: 13px;
        align-items: center;
        justify-content: center;
        width: auto;
        padding: 10px;
    `,

    exportExcelButton: () => css`
        display: flex;
        align-items: flex-start;
        
        border: 1px solid ${theme.color.darkGray};
        
        padding: 6px;
        gap: 5px;
        width: auto;
        height: fit-content;
        line-height: 20px;
        font-size: 14px;

        color: ${theme.color.darkGray};
        background: ${theme.color.white};
    `
}

type ButtonTypesProps = 'socialButton' | 'textButton' | 'titleButton' | 'reportButton' | 'returnButton' | 'commomButton' | 'logoutButton' | 'exportExcelButton';

export type StyledButtonProps = {} & Pick<ButtonProps, ButtonTypesProps>

export const Button = styled.button<StyledButtonProps>`
    ${({ theme, socialButton, titleButton, textButton, reportButton, returnButton, logoutButton, commomButton, exportExcelButton }) => css`
        display: flex;
        flex-direction: row;
        border-radius: 8px;
        padding: 5px 7px;
        width: 100%;
        height: 40px;
        gap: 12px;
        align-items: center;
        justify-content: center;
        font-size: ${theme.font.sizes.large};
        font-style: normal;
        font-weight: ${theme.font.bold};
        line-height: 24px;
        cursor: pointer;
        background: ${theme.color.blue}
        ${!!textButton && buttonModifiers.textButton(theme)}
        ${!!socialButton && buttonModifiers.socialButton(theme)}
        ${!!titleButton && buttonModifiers.titleButton(theme)}
        ${!!reportButton && buttonModifiers.reportButton()}
        ${!!returnButton && buttonModifiers.returnButton()}
        ${!!logoutButton && buttonModifiers.logoutButton()}
        ${!!commomButton && buttonModifiers.commomButton()}
        ${!!exportExcelButton && buttonModifiers.exportExcelButton()}

        ${media.lessThan("small")`
            margin: 5px 0px; 
        `}
    `}
`;  

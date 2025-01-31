import styled from "styled-components";
import theme from "../../styles/styled-theme";

export const ModalWrapper = styled.div `
    display: flex;
`;

export const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    width: 30vw;
    gap: 1vh;
    margin: 20px auto;
    padding: 20px;
    background-color: #e6e6e6;
    background-color: ${theme.color.lightGray};
    border-radius: 10px;
    box-shadow: 1vh 1vh 0.5vh rgba(0, 0, 0, 0.5);
`

export const SearchWrapper = styled.div `
    display: flex;
    align-items: center;
    flex-direction: row;
`
export const TemperatureModalWrapper = styled.div `
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ddd;
    borderRadius: 8px;
    gap: 1vh;
`

export const Img = styled.img `
    display: flex;
    width: 50px;
    height: 50px;
`

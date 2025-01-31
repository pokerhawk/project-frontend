import styled from 'styled-components';
import theme from '../../styles/styled-theme';

export const WebcamWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    min-width: 600px;
    min-height: 400px;
    padding: 10px;
    border: 1px solid ${theme.color.black};
    border-radius: 8px;
`;

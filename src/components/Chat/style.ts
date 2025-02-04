import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    min-width: 620px;
    gap: 10px;
`;

export const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

export const Textarea = styled.textarea`
    display: flex;
    flex-direction: column;
    min-height: 200px;
    min-width: 600px;
    padding: 10px;
    margin: 10px;
`;

export const BottomDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

export const RefreshDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
`

export const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    min-height: 400px;
    min-width: 150px;
    gap: 5px;
`

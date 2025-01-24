import styled from "styled-components";
import { EnumMethods } from ".";
import theme from "../../styles/styled-theme";

type MethodProps = {
  method: EnumMethods;
}

type H4Props = {
  sucess?: boolean;
}

export const Section = styled.div<{highlighted: boolean}>`
  margin-bottom: 20px;
  padding: 1vh 2vw;
  border-radius: 8px;
  background-color: ${(props) => (props.highlighted ? theme.color.lightBlue : 'transparent')};
  transition: background-color 0.3s ease;
`;

export const Endpoint = styled.div`
  background-color: ${theme.color.lightGray};
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-family: monospace;
  color: #007acc;
`;

export const Method = styled.span<MethodProps>`
  font-weight: bold;
  color: ${(props) =>
    props.method === "GET"
    ? "green"
    : props.method === "POST"
    ? "blue"
    : props.method === "PUT"
    ? "orange"
    : "red"
  };
  margin-right: 10px;
`;

export const ExampleSucess = styled.div`
  background-color: ${theme.color.darkGray};
  color: ${theme.color.white};
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  margin-top: 10px;
`;

export const ExampleFail = styled.div`
  background-color: ${theme.color.darkGray};
  color: ${theme.color.white};
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  margin-top: 10px;
`;

export const H4 = styled.h4<H4Props>`
  color: ${(props) => props.sucess?'green':'blue'}
`

export const HR = styled.hr`
  height: 5px;
  border-radius: 8px;
  background: ${theme.color.black};
  margin: 20px 0;
`

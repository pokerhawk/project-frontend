import * as S from './styles'
import { forwardRef } from "react";

export type EnumMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type EnumTypes = 'string' | 'number' | 'Array' | 'json' | 'Date' | 'Enum' ;

type RequestProps = {
  param: string;
  type: EnumTypes;
  required: "required" | "optional";
  information: string;
}

type EndPointProps = {
  title: string;
  method: EnumMethods;
  endpoint: string;
  information: string;
  paramOrBody: 'Request Parameters:' | 'Body JSON Parameters:';
  request: Array<RequestProps>;
  responseSucess: string;
  responseAlternate?: string;
  alternate: boolean;
}


const EndPoint = forwardRef<HTMLDivElement, EndPointProps>(({
  title, method, endpoint, information, paramOrBody, request, responseSucess, responseAlternate, alternate
}, ref) => {
  return(
    <S.Section ref={ref}>
      <h2>{title}</h2>
      <S.Endpoint>
        <S.Method method={method}>{method}</S.Method>
        {endpoint}
      </S.Endpoint>
      <p>{information}</p>
      <br/>
      <h4>{paramOrBody}</h4>
      <ul>
        {request.map((prop:RequestProps)=>{
          return(
            <li>
              <b>{prop.param}</b> ({prop.required}): {prop.type} {`-> ${prop.information}`}
            </li>
          );
        })}
      </ul>
      <br/>
      <S.H4 sucess>200 Status Response Example:</S.H4>
      <S.ExampleSucess>{responseSucess}</S.ExampleSucess>
      {alternate && (
        <>
          <br/>
          <S.H4>Alternate Response:</S.H4>
          <S.ExampleFail>{responseAlternate}</S.ExampleFail>
        </>
      )}
      <S.HR/>
    </S.Section>
  );
});

export default EndPoint;

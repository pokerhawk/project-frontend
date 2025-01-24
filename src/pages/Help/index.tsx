import { useRef } from 'react';
import EndPoint from '../../components/Endpoint';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';
import { PageWrapper } from '../../styles/Global';
import * as S from './styles'

const HelpPage = () => {
  const registerRef = useRef(null);
  const vAuthRef = useRef(null);
  const loginRef = useRef(null);
  const weatherRef = useRef(null);
  const items = [
    {
      itemName: 'Register',
      itemRef: registerRef
    },
    {
      itemName: 'Verify Authentication',
      itemRef: vAuthRef
    },
    {
      itemName: "Login",
      itemRef: loginRef
    },
    {
      itemName: "Weather by city",
      itemRef: weatherRef
    },
  ]

  return (
    <PageWrapper>
      <Header/>
      <S.Container>
      <S.Header>API Documentation</S.Header>
        <Sidebar
          defaultOpen={true}
          sidebarItems={items}
        />
        <EndPoint
          ref={registerRef}
          title={"Register"}
          method={"POST"}
          endpoint={"/auth/register"}
          information={"Register a new user."}
          paramOrBody={"Body JSON Parameters:"}
          alternate={false}
          request={[
            {
              param: 'name',
              type: 'string',
              required: 'required',
              information: 'The name of the user.'
            },
            {
              param: 'email',
              type: 'string',
              required: 'required',
              information: 'The email of the user.'
            },
            {
              param: 'password',
              type: 'string',
              required: 'required',
              information: 'The password of the user.'
            },
            {
              param: 'zipcode',
              type: 'string',
              required: 'optional',
              information: 'The zipcde of the user.'
            },
            {
              param: 'number',
              type: 'string',
              required: 'optional',
              information: "The user's house number."
            },
            {
              param: 'complement',
              type: 'string',
              required: 'optional',
              information: 'Extra information in regards with the user house location'
            },
          ]}
          responseSucess={
            `{
              statusCode: 200,
              message: "example"
            }`
          }
        />
        <EndPoint
          ref={vAuthRef}
          title={"Verify user 2FA authentication"}
          method={"GET"}
          endpoint={"/auth/isAuthenticated?email={email}"}
          information={"First step of LOGIN process where you check if use is authenticated with 2FA."}
          paramOrBody={"Request Parameters:"}
          alternate={true}
          request={[
            {
              param: 'email',
              required: 'required',
              type: 'string',
              information: "The user's email"
            }
          ]}
          responseSucess={
            `{
            mfaEnabled: true
          }`
          }
          responseAlternate={
            `{
            mfaEnabled: false,
            qrcode: "qrcode string"
          }`
          }
        />
        <EndPoint
          ref={loginRef}
          title={"Login"}
          method={"POST"}
          endpoint={"/auth/login"}
          information={"Second step of LOGIN process the actual login."}
          paramOrBody={"Body JSON Parameters:"}
          alternate={false}
          request={[
            {
              param: 'email',
              required: 'required',
              type: 'string',
              information: "The user's email"
            },
            {
              param: 'password',
              required: 'required',
              type: 'string',
              information: "The user's password"
            },
            {
              param: 'code',
              required: 'required',
              type: 'string',
              information: "The user's MFA code on his auth app"
            }
          ]}
          responseSucess={
            `{
            "message": "Bem vindo userName",
            "userId": "example-example",
            "type": "user",
            "access_token": "eyExample123",
            "refresh_token": "eyExample321"
          }`
          }
        />
        <EndPoint
          ref={weatherRef}
          title={"Weather by city"}
          method={"GET"}
          endpoint={"/externalApi/getWeatherByCity"}
          information={"Input a city name and get the current weather of that city"}
          paramOrBody={"Request Parameters:"}
          alternate={false}
          request={[
            {
              param: 'city',
              required: 'required',
              type: 'string',
              information: "The city's name"
            }
          ]}
          responseSucess={
            `{
              "callsLeft": 123123,
              "title": "Parcialmente nublado",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/example.png",
              "windSpeed": "9.4Km/h",
              "coldWindTemp": "26.9Cº",
              "humidity": "46%",
              "cloud": "75%",
              "temperature": "31.2Cº",
              "maxTemperature": "28.7Cº",
              "lowTemperature": "20.1Cº",
              "feelsLikeTemp": "37Cº"
            }`
          }
        />
      </S.Container>
    </PageWrapper>
  );
}

export default HelpPage;

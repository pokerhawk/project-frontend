import { useParams } from 'react-router-dom';
import * as S from './styles';
import * as G from '../../styles/Global';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import { useState } from 'react';
import Input from '../../components/Input';
import { weatherByCity, weatherResponseProps } from '../../services/weather';
import Modal from '../../components/Modal';
import { numberToRoman, romanToNumber } from '../../services/math';
import ChatComponent from '../../components/Chat';
import WebCam from '../../components/Webcam';

type weatherProps = {
    bool: boolean;
    data: weatherResponseProps | undefined;
}

const HomePage = () => {
    const [weather, setWeather] = useState<weatherProps>({bool: false, data: undefined})
    const [romanNumber, setRomanNumber] = useState<string|undefined>(undefined);
    const [numberRoman, setNumberRoman] = useState<number|undefined>(undefined);

    const closeModal = () =>{
        setWeather({bool:false, data: undefined})
    }

    return (
        <PageWrapper bigGap>
            <Header/>
            <S.Wrapper>
                <h1>Clima atual</h1>
                <S.SearchWrapper>
                    <p>Cidade:</p>
                    <Input 
                        inputSearch
                        onKeyDown={async(e:any)=>{
                            if(e.key === 'Enter'){
                                const arrOfTargetValue = e.target.value.split(" ")
                                let formatedString = '';
                                for(let i in arrOfTargetValue){
                                    const indValue = arrOfTargetValue[i];
                                    formatedString += `${indValue.toLowerCase()}%20`
                                }
                                const response = await weatherByCity(formatedString);
                                setWeather({
                                    bool: true,
                                    data: response
                                })
                            }
                        }}
                    />
                </S.SearchWrapper>
            </S.Wrapper>
            <S.Wrapper>
                <h1>Número para Romanos</h1>
                <S.SearchWrapper>
                    <p>Número:</p>
                    <Input 
                        inputSearch
                        type={"number"}
                        onKeyDown={async(e:any)=>{
                            if(e.key === 'Enter'){
                                setRomanNumber(undefined)
                                const res = await numberToRoman(e.target.value)
                                setRomanNumber(res)
                            }
                        }}
                    />
                </S.SearchWrapper>
                {(romanNumber) &&(
                    <p>Resposta: {romanNumber}</p>
                )}
            </S.Wrapper>
            <S.Wrapper>
                <h1>Romanos para Número</h1>
                <S.SearchWrapper>
                    <p>Número:</p>
                    <Input 
                        inputSearch
                        onKeyDown={async(e:any)=>{
                            if(e.key === 'Enter'){
                                setRomanNumber(undefined)
                                const res = await romanToNumber(e.target.value)
                                setNumberRoman(res)
                            }
                        }}
                    />
                </S.SearchWrapper>
                {(numberRoman) &&(
                    <p>Resposta: {numberRoman}</p>
                )}
            </S.Wrapper>
            {weather.bool && (
                <Modal
                    title={"Clima"}
                    isOpen={weather.bool}
                    closeModal={closeModal}
                    children={
                        <S.TemperatureModalWrapper>
                            <h1>{weather.data?.city} - {weather.data?.region} - {weather.data?.country}</h1>
                            <G.SimpleRowWrapper>
                                <h2>{weather.data?.title}</h2>
                                <S.Img src={weather.data?.icon} alt={`Temperature icon`} />
                            </G.SimpleRowWrapper>
                            <p><strong>Temperatura:</strong> {weather.data?.temperature}</p>
                            <p><strong>Sensação Termica:</strong> {weather.data?.feelsLikeTemp}</p>
                            <p><strong>Temperatura Mín:</strong> {weather.data?.lowTemperature}</p>
                            <p><strong>Temperatura Máx:</strong> {weather.data?.maxTemperature}</p>
                            <p><strong>Temp. Vento Frio:</strong> {weather.data?.coldWindTemp}</p>
                            <p><strong>Humidade:</strong> {weather.data?.humidity}</p>
                            <p><strong>Nuvem:</strong> {weather.data?.cloud}</p>
                            <p><strong>Velocidade do vento:</strong> {weather.data?.windSpeed}</p>
                        </S.TemperatureModalWrapper>
                    }
                />
            )}
            <WebCam/>
            <ChatComponent/>
        </PageWrapper>
    );
}

export default HomePage;

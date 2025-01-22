import { useParams } from 'react-router-dom';
import * as S from './styles';
import * as G from '../../styles/Global';
import UsersTable from '../../components/UsersTable';
import { CardWrapper, PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';
import Chart from '../../components/Chart';
import { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import Input from '../../components/Input';
import SearchIcon from '../../assets/images/icons/SearchIcon';
import { weatherByCity, weatherResponseProps } from '../../services/weather';
import Modal from '../../components/Modal';

type weatherProps = {
    bool: boolean;
    data: weatherResponseProps | undefined;
}

const HomePage = () => {
    const {id, type} = useParams();
    const [loadingChart, setLoadingChart] = useState(true);
    const [chartData, setChartData] = useState<any>([]);
    const [cardsData, setCardsData] = useState([
        {
            cardTitle: 'Saldo Empresarial',
            value: 0,
            isMonetaryValue: true
        },
        {
            cardTitle: 'ROI',
            value: 0,
            isMonetaryValue: true
        },
        {
            cardTitle: 'ROI %',
            value: 0
        }
    ])
    const [weather, setWeather] = useState<weatherProps>({bool: false, data: undefined})

    const closeModal = () =>{
        setWeather({bool:false, data: undefined})
    }
    
    useEffect(()=>{
        //console.log("ya")
    }, [loadingChart === true])

    return (
        <PageWrapper>
            <Header/>
            <Sidebar defaultOpen={false}/>
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
            {/* <CardWrapper> */}
            {/*     <Cards data={cardsData} /> */}
            {/* </CardWrapper> */}
            {/* <S.Wrapper> */}
            {/*     <h1>Suas Vendas</h1> */}
            {/*     <UsersTable title='Vendas' /> */}
            {/* </S.Wrapper> */}
            {/* <S.SimpleWrapper> */}
            {/*     <h1>Over View Mensal</h1> */}
            {/*     <S.Wrapper> */}
            {/*         <Chart */}
            {/*             title='Project-Frontend' */}
            {/*             type='pie' */}
            {/*             labels={['Receita', 'Despesa', 'Saldo']} */}
            {/*             series={chartData} */}
            {/*         /> */}
            {/*     </S.Wrapper> */}
            {/* </S.SimpleWrapper> */}
        </PageWrapper>
    );
}

export default HomePage;

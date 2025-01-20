import { useParams } from 'react-router-dom';
import * as S from './styles';
import UsersTable from '../../components/UsersTable';
import { CardWrapper, PageWrapper, SimpleWrapper } from '../../styles/Global';
import Header from '../../components/Header';
import Sidebar from '../../components/SideBar';
import Chart from '../../components/Chart';
import { useEffect, useState } from 'react';
import Cards from '../../components/Cards';
import Input from '../../components/Input';

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
    
    useEffect(()=>{
        //console.log("ya")
    }, [loadingChart === true])

    return (
        <PageWrapper>
            <Header/>
            <CardWrapper>
                <Cards data={cardsData} />
            </CardWrapper>
            <S.Wrapper>
                <h1>Suas Vendas</h1>
                <UsersTable title='Vendas' />
            </S.Wrapper>
            <Input inputSearch/>
            <SimpleWrapper>
                <Sidebar defaultOpen={false}/>
                <h1>Over View Mensal</h1>
                <S.Wrapper>
                    <Chart
                        title='Project-Frontend'
                        type='pie'
                        labels={['Receita', 'Despesa', 'Saldo']}
                        series={chartData}
                    />
                </S.Wrapper>
            </SimpleWrapper>
        </PageWrapper>
    );
}

export default HomePage;

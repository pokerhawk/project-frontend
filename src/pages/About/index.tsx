import * as S from './styles';
import { PageWrapper } from '../../styles/Global';
import Header from '../../components/Header';

const AboutPage = () => {
  return (
    <PageWrapper>
      <Header/>
      <S.Container>
        <S.Header>
          <S.Name>Eliabe Gontijo</S.Name>
          <S.JobTitle>Software Engineer</S.JobTitle>
        </S.Header>

        <S.Section>
          <S.SectionTitle>Summary</S.SectionTitle>
          <S.Paragraph>
            Sou um desenvolvedor Fullstack especializando em backend, trilíngue buscando ser poliglota com cerca de 1 ano de experiência prossional e 4 anos de aprendizado.
          </S.Paragraph>
          <br/>
          <S.Paragraph>
            Atualmente estou com um projeto no github chamado project-api onde estou aplicando meus conhecimentos de backend, e mais para frente estarei integrando este projeto com um frontend (project-frontend) para ter uma demonstração mais sólida do meu aprendizado.
          </S.Paragraph>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Experience</S.SectionTitle>
          <S.List>
            <S.ListItem>Full-Stack Jr. Developer at 360Hub (2023 - 2024)</S.ListItem>
            <S.TabListItem>Nos primeiros meses fiquei encarregado juntamente com o time de desenvolvedores Jr. de aprender
sobre o sistema e desenvolver um sistema interno de gerenciamento. Inicialmente contribui para o
frontend e backend mas ao longo do tempo fiquei encarregado somente do backend.</S.TabListItem>
            <S.TabListItem>Quando o projeto interno foi finalizado e já tinha conhecimento sobre o sistema e banco de dados
fiquei encarregado de resolver bugs no sistema principal, pouco tempo depois comecei a implementar
novos módulos, componentes e páginas além de tabelas no banco de dados.</S.TabListItem>
            <S.TabListItem>Utilizamos o framework ReactJs para o front e NestJs para o backend com typescript e prisma ORM,
tínhamos alguns bancos de dados MySQL e PostgreSQL. Aprendi sobre esses 2 frameworks, a fazer
deploy na AWS através do github utilizando git workow e git secrets, aprendi também sobre AWS,
SQS, EC2, S3, serverless e lambda functions.</S.TabListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Education</S.SectionTitle>
          <S.List>
            <S.ListItem>Certification in React Development (2021 - 2022) - The Complete Web Developer: Zero to Mastery (by Andrei Neagoie)</S.ListItem>
            {/* <S.ListItem>E.E. Prof. Alisson Pereira Guimarães (2015 - 2017) - High School</S.ListItem> */}
            <S.ListItem>E.E. Prof. Alisson Pereira Guimarães (2015 - 2017) - High School</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Skills</S.SectionTitle>
          <S.List>
            <S.ListItem>JavaScript, TypeScript, Node.js, React, Nest</S.ListItem>
            <S.ListItem>Linux, Bash/Shell (scripting), AWS, git, Serverless</S.ListItem>
            <S.ListItem>Agile Development, Fast Learner, Computer Technician</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Languages</S.SectionTitle>
          <S.List>
            <S.ListItem>Portuguese - Native</S.ListItem>
            <S.ListItem>English - C2</S.ListItem>
            <S.ListItem>French - B2</S.ListItem>
            <S.ListItem>Spanish - A2</S.ListItem>
          </S.List>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Contact</S.SectionTitle>
          <S.Paragraph>Email: <a href={"mailto:eliabedosreis@gmail.com?subject=Olá!&body=Boa%20tarde%20Eliabe,"}>eliabedosreis@gmail.com</a></S.Paragraph>
          <S.Paragraph>Github: <a href={"https://github.com/pokerhawk"}>github.com/pokerhawk</a></S.Paragraph>
          <S.Paragraph>LinkedIn: <a href={"https://linkedin.com/in/eliabe-gontijo-1289481b1"}>linkedin.com/in/eliabe-gontijo-1289481b1</a></S.Paragraph>
        </S.Section>
      </S.Container>
    </PageWrapper>
  );
};

export default AboutPage;

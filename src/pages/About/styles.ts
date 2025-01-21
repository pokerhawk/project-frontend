import styled from 'styled-components';
import theme from '../../styles/styled-theme';

export const Container = styled.div`
  max-width: 70vw;
  margin: 20px auto;
  padding: 20px;
  background-color: #e6e6e6;
  background-color: ${theme.color.lightGray};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const Name = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #333;
`;

export const JobTitle = styled.h2`
  font-size: 1.5rem;
  margin: 5px 0;
  color: #666;
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #1570ef;
  display: inline-block;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
`;

export const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 0.5vh;

  &::before {
    content: '• ';
    color: #1570ef;
  }
`;


export const TabListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1vh;
  padding-left: 2vw;

  &::before {
    content: '• ';
    color: #1570ef;
  }
`;

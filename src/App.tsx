import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import MovieOrShow from './components/MovieOrShow';
import { MantineProvider } from '@mantine/core';

import './App.css';
import '@mantine/core/styles.css';
import styled from 'styled-components';
import { BackdropContext, BackdropProvider } from './contexts/BackdropContext';
import { useContext } from 'react';
import Person from './components/Person';

const MainHeader = styled.h1`
  text-align: left;
  color: #eaeaea;
  margin-top: 8px;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(66, 66, 66, 0.5);
`;
const StyledAppContainer = styled.div<{ background: string }>`
  background-image: ${props =>
    props.background
      ? `
    linear-gradient(
      rgba(36, 34, 36, 0.85),
      #151515
    ), url(${props.background})
    `
      : 'none'};
  height: 100%;
  background-color: #151515;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem 2rem 2rem;
  #main {
    color: #f0f0f0;
  }
`;

const AppContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { backgroundImage } = useContext(BackdropContext);
  return (
    <StyledAppContainer background={backgroundImage}>
      {children}
    </StyledAppContainer>
  );
};

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BackdropProvider>
        <AppContainer>
          <MainHeader
            onClick={() => {
              window.location.href = '/';
            }}
          >
            TMDB Search
          </MainHeader>
          <main id="main">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/movie/:id" element={<MovieOrShow />} />
                <Route path="/show/:id" element={<MovieOrShow />} />
                <Route path="/person/:id" element={<Person />} />
              </Routes>
            </BrowserRouter>
          </main>
        </AppContainer>
      </BackdropProvider>
    </MantineProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Movie from './components/MovieOrShow';
import { MantineProvider } from '@mantine/core';

import './App.css';
import '@mantine/core/styles.css';
import styled from 'styled-components';
import { BackdropContext, BackdropProvider } from './contexts/BackdropContext';
import { useContext } from 'react';

const MainHeader = styled.h1`
  text-align: left;
  color: #eaeaea;
  margin-top: 8px;
  cursor: pointer;
`;
const StyledAppContainer = styled.div<{ backgroundImage: string }>`
  background-image: ${props =>
    props.backgroundImage
      ? `
    linear-gradient(
      135deg,
      rgba(34, 33, 34, 0.75),
      rgba(0, 0, 0, 1)
    ), url(${props.backgroundImage})
    `
      : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
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
    <StyledAppContainer backgroundImage={backgroundImage}>
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
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/show/:id" element={<Movie />} />
              </Routes>
            </BrowserRouter>
          </main>
        </AppContainer>
      </BackdropProvider>
    </MantineProvider>
  );
}

export default App;

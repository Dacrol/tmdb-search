import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import MovieOrShow from './components/MovieOrShow';
import { MantineProvider } from '@mantine/core';
import './App.css';
import '@mantine/core/styles.css';
import { BackdropContext, BackdropProvider } from './contexts/BackdropContext';
import { useContext } from 'react';
import Person from './components/Person';
import { MainHeader, StyledAppContainer } from './components/styled/components';

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

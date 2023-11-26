import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Movie from './components/Movie';
import { MantineProvider } from '@mantine/core';

import './App.css';
import '@mantine/core/styles.css';
import styled from 'styled-components';

const MainHeader = styled.h1`
  text-align: left;
  color: #eaeaea;
  margin-top: 8px;
`;

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div>
        <MainHeader>TMDB Search</MainHeader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MantineProvider>
  );
}

export default App;

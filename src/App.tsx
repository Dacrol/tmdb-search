import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Movie from './components/Movie';
import { MantineProvider } from '@mantine/core';

import './App.css';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div>
        <h1>TMDB Search</h1>
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

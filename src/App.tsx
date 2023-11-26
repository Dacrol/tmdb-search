import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Movie from './components/Movie';

function App() {
  return (
    <>
      <div>
        <h1>TMDB Search</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

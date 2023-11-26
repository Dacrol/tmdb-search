import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MovieDetails } from '../types/MovieDetails';
import { ShowDetails } from '../types/ShowDetails';
import { BackdropContext } from '../contexts/BackdropContext';

const getById = async (id: string, media_type: string) => {
  const res = await fetch(`/api/${media_type}/${id}`);
  const data = await res.json();
  return data;
};

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setBackgroundImage } = useContext(BackdropContext);
  const location = useLocation();
  const media_type = location.pathname.includes('/movie/') ? 'movie' : 'tv';

  const [movieData, setMovieData] = useState<MovieDetails | null>(null);
  const [, setShowData] = useState<ShowDetails | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchMovie = async () => {
      const detailsData = await getById(id, media_type);
      if (media_type === 'movie') {
        setMovieData(detailsData);
      } else {
        setShowData(detailsData);
      }
      setBackgroundImage(
        'https://image.tmdb.org/t/p/original' + detailsData.backdrop_path
      );
    };

    fetchMovie();
  }, [id]);

  if (!movieData) {
    return <div>Loading...</div>;
  }
  if (!id) {
    return <div>No movie ID provided</div>;
  }
  return (
    <div>
      <div>
        <h1>{movieData.title}</h1>
      </div>
      <p>{movieData.overview}</p>
    </div>
  );
};

export default Movie;

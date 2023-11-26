import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const getMovieById = async (id: string) => {
  const res = await fetch(`/api/movie/${id}`);
  const data = await res.json();
  return data;
};

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchMovie = async () => {
      const movieData = await getMovieById(id);
      setMovie(movieData);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  if (!id) {
    return <div>No movie ID provided</div>;
  }
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <pre>{JSON.stringify(movie, null, 2)}</pre>
    </div>
  );
};

export default Movie;

// express proxy server to the TMDB API. Used to keep the API key secret.

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/*', (req, res) => {
  const url = `${BASE_URL}${req.url.replace('/api', '')}`;
  console.log(url);

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        accept: 'application/json',
      },
    })
    .then(data => {
      res.send(data.data);
    })
    .catch(error => res.send(error));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

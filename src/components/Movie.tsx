import React from 'react';
import { MovieDetails } from '../types/MovieDetails';
import { Card, Grid } from '@mantine/core';
import styled from 'styled-components';
import { StyledSearchResultCard } from './Search';
import { useNavigate } from 'react-router-dom';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  span {
    font-size: 0.9em;
    color: #eaeaea;
    &.review-author {
      font-weight: 600;
      margin-right: 8px;
    }
    &.review-score {
      font-weight: 400;
    }
  }
`;

const MovieContainer = styled.div`
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .poster {
    max-height: 500px;
    max-width: 350px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .info p {
    font-size: 1.1em;
    font-weight: 600;
    color: #eaeaea;
    &.genres span {
      &:first-child {
        margin-left: 8px;
      }
      border-radius: 4px;
      border: 1px solid rgb(82, 82, 82);
      margin: 0 2px;
      padding: 0 2px;
      padding-right: 6px;
      font-size: 0.85em;
      box-sizing: border-box;
    }
    .score {
      font-weight: 700;
    }
    .votes {
      font-size: 0.85em;
      font-weight: 400;
    }
  }
`;

export const SubScrollContainer = styled.div`
  max-height: 610px;
  width: 85%;
  @media (max-width: 768px) {
    width: 90%;
  }
  overflow-y: scroll;
  .pre-wrap {
    white-space: pre-wrap;
  }
`;

const Movie: React.FC<{
  movieDetails: MovieDetails;
}> = ({ movieDetails }) => {
  const navigate = useNavigate();
  return (
    <MovieContainer>
      <Grid>
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          <h1 id="movie-title">{movieDetails.title}</h1>
          <div className="info">
            <p>Year: {movieDetails.release_date.split('-')[0]}</p>
            <p className="genres">
              Genres:
              {movieDetails.genres.map(genre => (
                <span key={genre.id}> {genre.name}</span>
              ))}
            </p>
            <p>
              Score: <span className="score">{movieDetails.vote_average}</span>
              <span className="votes"> ({movieDetails.vote_count} votes)</span>
            </p>
          </div>
          <p>{movieDetails.overview}</p>
        </Grid.Col>
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          {movieDetails.poster_path ? (
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          ) : null}
        </Grid.Col>
      </Grid>
      <h2>Cast</h2>
      <SubScrollContainer>
        <Grid>
          {movieDetails.credits.cast.map(castMember => (
            <Grid.Col
              span={{
                base: 12,
                xs: 4,
                sm: 4,
                lg: 3,
              }}
              key={castMember.id}
            >
              <StyledSearchResultCard
                background={
                  castMember.profile_path
                    ? `url(https://image.tmdb.org/t/p/w500${castMember.profile_path})`
                    : 'none'
                }
                onClick={() => {
                  navigate(`/person/${castMember.id}`);
                }}
              >
                <p>{castMember.name}</p>
              </StyledSearchResultCard>
            </Grid.Col>
          ))}
        </Grid>
      </SubScrollContainer>
      <h2>Reviews</h2>
      <SubScrollContainer>
        {movieDetails.reviews.results.map(review => (
          <Card
            key={review.id}
            shadow="sm"
            padding="sm"
            radius="sm"
            style={{ marginBottom: '10px' }}
          >
            <ReviewContainer>
              <div>
                <span className="review-author">By: {review.author}</span>
                <span className="review-score">
                  Rating: {review.author_details.rating}
                </span>
              </div>
              <p className="review-content pre-wrap">{review.content}</p>
            </ReviewContainer>
          </Card>
        ))}
      </SubScrollContainer>
    </MovieContainer>
  );
};

export default Movie;

import { Grid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonDetails } from '../types/PersonDetails';
import { BackdropContext } from '../contexts/BackdropContext';
import {
  PersonContainer,
  StyledSearchResultCard,
  SubScrollContainer,
} from './styled/components';

const getPerson = async (id: string) => {
  const res = await fetch(`/api/person/${id}?append_to_response=movie_credits`);
  const data = await res.json();
  return data;
};

const Person: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [personData, setPersonData] = useState<PersonDetails | null>(null);
  const { setBackgroundImage } = useContext(BackdropContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPerson = async () => {
      const personData = await getPerson(id);
      setPersonData(personData);
      if (personData.profile_path) {
        setBackgroundImage(
          'https://image.tmdb.org/t/p/original' + personData.profile_path
        );
      } else {
        setBackgroundImage('');
      }
    };
    fetchPerson();
  }, [id, setBackgroundImage]);

  if (!id) {
    return <div>No person ID provided</div>;
  }

  if (!personData) {
    return <div>Loading...</div>;
  }

  return (
    <PersonContainer>
      <Grid>
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          <h1 id="person-name">{personData.name}</h1>
          <div className="info">
            <p>
              <span className="bold">Birthday:</span> {personData.birthday}
            </p>
            <p>
              <span className="bold">Place of birth:</span>{' '}
              {personData.place_of_birth}
            </p>
            <p>
              <span className="bold">Known for:</span>{' '}
              {personData.known_for_department}
            </p>
          </div>
        </Grid.Col>
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          {personData?.profile_path ? (
            <img
              className="profile"
              src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
              alt={personData.name}
            />
          ) : null}
        </Grid.Col>
      </Grid>
      <h2>Biography</h2>
      <SubScrollContainer>
        <p className="pre-wrap">{personData.biography}</p>
      </SubScrollContainer>
      {personData?.movie_credits?.cast &&
      personData?.movie_credits?.cast?.length > 0 ? (
        <>
          <h2>Movies</h2>
          <SubScrollContainer>
            <Grid>
              {personData.movie_credits.cast.map(movie => (
                <Grid.Col
                  span={{
                    base: 12,
                    xs: 4,
                    sm: 4,
                    lg: 3,
                  }}
                  key={movie.id}
                >
                  <StyledSearchResultCard
                    background={
                      movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                        : 'none'
                    }
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                    }}
                  >
                    <p>{movie.title}</p>
                  </StyledSearchResultCard>
                </Grid.Col>
              ))}
            </Grid>
          </SubScrollContainer>
        </>
      ) : null}
    </PersonContainer>
  );
};

export default Person;

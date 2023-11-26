import { Grid, Input, Tooltip } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { SearchResult } from '../types/SearchResults';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BackdropContext } from '../contexts/BackdropContext';

export const StyledSearchResultCard = styled.div<{ background: string }>`
  background-image: linear-gradient(
      135deg,
      rgba(71, 64, 75, 0.5),
      rgba(0, 0, 0, 1)
    ),
    ${props => props.background};
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 4px;
  border: 1px solid rgba(66, 66, 66, 1);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  &:not(.no-click) {
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }
  span {
    font-size: 1.5em;
    color: #eaeaea;
    @media (max-width: 768px) {
      font-size: 1.25em;
    }
  }
`;

const colSpanConfig = { base: 12, xs: 6, sm: 4, lg: 3 };

const SearchResultCard: React.FC<{
  className?: string;
  backdropUrl: string | null;
  children: React.ReactNode;
  id: number;
  media_type: string;
}> = ({ backdropUrl, children, id, media_type, className }) => {
  const navigate = useNavigate();
  const { setBackgroundImage } = useContext(BackdropContext);
  useEffect(() => {
    setBackgroundImage('');
  }, [setBackgroundImage]);
  const backgroundImage = backdropUrl
    ? `url(https://image.tmdb.org/t/p/w500${backdropUrl})`
    : 'none';
  return (
    <StyledSearchResultCard
      className={`result-card${className ? ` ${className}` : ''}`}
      background={backgroundImage}
      onClick={() => {
        if (media_type === 'person') {
          navigate(`/person/${id}`);
        } else if (media_type === 'movie') {
          navigate(`/movie/${id}`);
        }
      }}
    >
      {children}
    </StyledSearchResultCard>
  );
};

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (debouncedSearchTerm) {
      setLoading(true);

      fetch(`/api/search/multi?query=${debouncedSearchTerm}`, { signal })
        .then(res => res.json())
        .then(data => {
          const results = data.results;
          console.log(results);
          if (!results) {
            return;
          }
          setSearchResults(results);
          setLoading(false);
        })
        .catch(error => {
          if (error.name === 'AbortError') {
            console.log('Search request aborted');
          } else {
            console.error('Error occurred during search:', error);
          }
          setLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  return (
    <>
      <div>
        <Input
          id="search"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
          mb={'24px'}
          ml={'24px'}
          mr={'24px'}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {searchResults.length === 0 && searchTerm === '' ? (
              <div>
                <p>Search for a movie or person</p>
              </div>
            ) : (
              <div>
                <Grid>
                  {searchResults.map(result => {
                    if (result.media_type === 'person') {
                      return (
                        <Grid.Col span={colSpanConfig} key={result.id}>
                          <SearchResultCard
                            id={result.id}
                            media_type={result.media_type}
                            backdropUrl={
                              result.backdrop_path || result.profile_path
                            }
                          >
                            <span>{result.name}</span>
                          </SearchResultCard>
                        </Grid.Col>
                      );
                    } else if (result.media_type === 'movie') {
                      return (
                        <Grid.Col span={colSpanConfig} key={result.id}>
                          <SearchResultCard
                            id={result.id}
                            media_type={result.media_type}
                            backdropUrl={
                              result.backdrop_path || result.poster_path
                            }
                          >
                            <span>{result.title}</span>
                          </SearchResultCard>
                        </Grid.Col>
                      );
                    } else {
                      return (
                        <Tooltip
                          label={
                            'Details for TV Series are not yet implemented'
                          }
                          position="top"
                          withArrow
                          key={result.id}
                        >
                          <Grid.Col span={colSpanConfig} key={result.id}>
                            <SearchResultCard
                              className="no-click"
                              id={result.id}
                              media_type={result.media_type}
                              backdropUrl={
                                result.backdrop_path || result.poster_path
                              }
                            >
                              <span>{result.name}</span>
                            </SearchResultCard>
                          </Grid.Col>
                        </Tooltip>
                      );
                    }
                  })}
                </Grid>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Search;

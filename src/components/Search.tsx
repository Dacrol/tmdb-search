import { useEffect, useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

      fetch(`/api/search/movie?query=${debouncedSearchTerm}`, { signal })
        .then(res => res.json())
        .then(data => {
          setSearchResults(data);
          setLoading(false);
          console.log(data);
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
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <pre>{JSON.stringify(searchResults, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

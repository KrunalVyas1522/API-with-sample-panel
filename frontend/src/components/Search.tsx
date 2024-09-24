"use client"
import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/phases?query=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a phrase..."
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 ? (
        <ul>
          {results.map((phrase) => (
            <li key={phrase.id}>
              {phrase.phrase} - {phrase.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;

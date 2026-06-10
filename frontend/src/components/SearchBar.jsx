import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} id="search-form">
      <div className="search-bar__wrapper">
        <input
          id="search-input"
          type="text"
          className="search-bar__input"
          placeholder="Pesquisar por título do livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          aria-label="Buscar livros por título"
        />
        <button
          id="search-button"
          type="submit"
          className="search-bar__button"
          disabled={loading || !query.trim()}
          aria-label="Buscar"
        >
          {loading ? (
            <span className="search-bar__spinner" />
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Buscar
            </>
          )}
        </button>
      </div>
    </form>
  );
}
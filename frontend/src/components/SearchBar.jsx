import { useState } from 'react';

/**
 * Componente de barra de busca.
 * Permite ao usuário pesquisar livros pelo título.
 *
 * @param {Object} props
 * @param {Function} props.onSearch - Callback chamado ao submeter a busca.
 * @param {boolean} props.loading - Indica se uma busca está em andamento.
 */
export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} id="search-form">
      <div className="search-bar__wrapper">
        <input
          id="search-input"
          type="text"
          className="search-bar__input"
          placeholder=""
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

import { useBooks } from './hooks/useBooks';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import CountryMap from './components/CountryMap';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const {
    books,
    loading,
    error,
    hasSearched,
    selectedBook,
    countries,
    countriesLoading,
    countriesError,
    selectedLanguage,
    search,
    selectBook,
    clearSelection,
  } = useBooks();

  const isInitial = !hasSearched && !loading;

  return (
    <div className={`app${isInitial ? ' app--centered' : ''}`} id="app">
      <div className={isInitial ? 'app__center-wrap' : ''}>
        <header className="app__header">
          <div className="app__header-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            literatura + geografia
          </div>
          <h1 className="app__title">
            Mapa<span>Livros</span>
          </h1>
          <p className="app__subtitle">Descubra o mundo através dos livros</p>
        </header>

        <SearchBar onSearch={search} loading={loading} />
      </div>

      {error && (
        <ErrorMessage
          message={error}
          type={books.length === 0 && hasSearched ? 'warning' : 'error'}
        />
      )}

      {loading && (
        <div className="loading" id="loading-state">
          <div className="spinner" />
          <p className="loading__text">Buscando livros...</p>
        </div>
      )}

      {!loading && books.length > 0 && !selectedBook && (
        <BookList
          books={books}
          onSelectBook={selectBook}
          selectedBook={selectedBook}
        />
      )}

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          selectedLanguage={selectedLanguage}
          onClose={clearSelection}
        />
      )}

      {countriesError && (
        <ErrorMessage message={countriesError} type="warning" />
      )}

      {(countries.length > 0 || countriesLoading) && (
        <CountryMap
          countries={countries}
          loading={countriesLoading}
          selectedLanguage={selectedLanguage}
        />
      )}

      {!isInitial && (
        <footer className="app__footer">
          <p>
            MapaLivros &mdash; Dados de{' '}
            <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">Open Library</a>
            {' '}e{' '}
            <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">REST Countries</a>
          </p>
        </footer>
      )}
    </div>
  );
}
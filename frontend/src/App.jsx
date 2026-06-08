import { useBooks } from './hooks/useBooks';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import CountryMap from './components/CountryMap';
import ErrorMessage from './components/ErrorMessage';

/**
 * Componente principal da aplicação MapaLivros.
 *
 * Orquestra todos os componentes e gerencia o fluxo de dados
 * através do hook useBooks. A aplicação segue o fluxo:
 * 1. Usuário pesquisa um livro → SearchBar
 * 2. Resultados exibidos → BookList → BookCard
 * 3. Usuário seleciona um livro → BookDetails
 * 4. Países do idioma exibidos → CountryMap
 */
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

  return (
    <div className="app" id="app">
      {/* Cabeçalho */}
      <header className="app__header">
        <div className="app__logo">
          <div className="app__logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h1 className="app__title">Mapa dos Livros</h1>
        </div>
        <p className="app__subtitle">Navegue pelo mundo com os livros...</p>
      </header>

      {/* Barra de busca */}
      <SearchBar onSearch={search} loading={loading} />

      {/* Mensagens de erro da busca */}
      {error && (
        <ErrorMessage
          message={error}
          type={books.length === 0 && hasSearched ? 'warning' : 'error'}
        />
      )}

      {/* Estado de carregamento */}
      {loading && (
        <div className="loading" id="loading-state">
          <div className="spinner" />
          <p className="loading__text">Buscando livros...</p>
        </div>
      )}

      {/* Estado inicial (hero) */}
      {!hasSearched && !loading && (
        <div className="hero" id="hero-section">
          <div className="hero__icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
          </div>
          <h2 className="hero__title">Explore livros pelo mundo</h2>
          <p className="hero__text">
            Pesquise um livro pelo título e descubra em quais países
            o idioma da obra é falado, visualizando tudo em um mapa interativo.
          </p>
        </div>
      )}

      {/* Lista de resultados */}
      {!loading && books.length > 0 && !selectedBook && (
        <BookList
          books={books}
          onSelectBook={selectBook}
          selectedBook={selectedBook}
        />
      )}

      {/* Detalhes do livro selecionado */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          selectedLanguage={selectedLanguage}
          onClose={clearSelection}
        />
      )}

      {/* Erro ao buscar países */}
      {countriesError && (
        <ErrorMessage
          message={countriesError}
          type="warning"
        />
      )}

      {/* Mapa de países */}
      {(countries.length > 0 || countriesLoading) && (
        <CountryMap
          countries={countries}
          loading={countriesLoading}
        />
      )}

      {/* Rodapé */}
      <footer className="app__footer">
        <p>
          MapaLivros &mdash; Desenvolvido com React + Vite &bull;
          Dados de{' '}
          <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">
            Open Library
          </a>{' '}
          e{' '}
          <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">
            REST Countries
          </a>
        </p>
      </footer>
    </div>
  );
}

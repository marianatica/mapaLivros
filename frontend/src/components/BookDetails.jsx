import { getLanguageName } from '../services/openLibrary';

export default function BookDetails({ book, selectedLanguage, onClose }) {
  if (!book) return null;

  const primaryLang = selectedLanguage || book.languages?.[0] || null;
  const language = primaryLang ? getLanguageName(primaryLang) : null;

  const authors = book.authors?.length > 0
    ? book.authors.join(', ')
    : 'Autor desconhecido';

  return (
    <section className="book-details" id="book-details">
      <button
        className="book-details__close"
        onClick={onClose}
        aria-label="Fechar detalhes"
        id="close-details"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="book-details__content">
        <div className="book-details__cover">
          {book.coverUrlLarge || book.coverUrl ? (
            <img
              src={book.coverUrlLarge || book.coverUrl}
              alt={`Capa de ${book.title}`}
              className="book-details__image"
            />
          ) : (
            <div className="book-details__no-cover">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Sem capa</span>
            </div>
          )}
        </div>

        <div className="book-details__info">
          <h2 className="book-details__title">{book.title}</h2>
          <p className="book-details__author">{authors}</p>

          <div className="book-details__tags">
            {book.firstPublishYear && (
              <span className="book-details__tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {book.firstPublishYear}
              </span>
            )}

            {language && (
              <span className="book-details__tag book-details__tag--language">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" />
                  <path d="M2 5h12" /><path d="M7 2h1" />
                  <path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
                </svg>
                {language}
              </span>
            )}

            {book.languages?.length > 1 && (
              <span className="book-details__tag">
                + {book.languages.length - 1} idioma{book.languages.length > 2 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
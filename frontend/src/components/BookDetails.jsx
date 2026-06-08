import { getLanguageName } from '../services/openLibrary';

/**
 * Componente de detalhes do livro selecionado.
 * Exibe informações completas: capa grande, título, autores,
 * ano de publicação e idioma principal.
 *
 * @param {Object} props
 * @param {Object} props.book - Dados do livro selecionado.
 * @param {string|null} props.selectedLanguage - Código do idioma selecionado.
 * @param {Function} props.onClose - Callback para fechar os detalhes.
 */
export default function BookDetails({ book, selectedLanguage, onClose }) {
  if (!book) return null;

  return (
    <section className="book-details" id="book-details">
      <button
        className="book-details__close"
        onClick={onClose}
        aria-label="Fechar detalhes"
        id="close-details"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="book-details__content">
        {/* Capa grande */}
        <div className="book-details__cover">
          {book.coverUrlLarge ? (
            <img
              src={book.coverUrlLarge}
              alt={`Capa de ${book.title}`}
              className="book-details__image"
            />
          ) : book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Capa de ${book.title}`}
              className="book-details__image"
            />
          ) : (
            <div className="book-details__no-cover">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Sem capa disponível</span>
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="book-details__info">
          <h2 className="book-details__title">{book.title}</h2>

          <div className="book-details__meta">
            <div className="book-details__meta-item">
              <span className="book-details__label">Autor(es)</span>
              <span className="book-details__value">
                {book.authors.length > 0
                  ? book.authors.join(', ')
                  : 'Autor desconhecido'}
              </span>
            </div>

            {book.firstPublishYear && (
              <div className="book-details__meta-item">
                <span className="book-details__label">Ano de publicação</span>
                <span className="book-details__value">{book.firstPublishYear}</span>
              </div>
            )}

            <div className="book-details__meta-item">
              <span className="book-details__label">Idioma principal</span>
              <span className="book-details__value book-details__language">
                {selectedLanguage
                  ? getLanguageName(selectedLanguage)
                  : book.languages.length > 0
                    ? getLanguageName(book.languages[0])
                    : 'Não informado'}
              </span>
            </div>

            {book.languages.length > 1 && (
              <div className="book-details__meta-item">
                <span className="book-details__label">Outros idiomas</span>
                <span className="book-details__value">
                  {book.languages.slice(1).map(getLanguageName).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

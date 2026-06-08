/**
 * Componente de card individual do livro.
 * Exibe informações resumidas: capa, título, autor(es) e ano.
 *
 * @param {Object} props
 * @param {Object} props.book - Dados do livro.
 * @param {Function} props.onSelect - Callback ao clicar no card.
 * @param {boolean} props.isSelected - Se o livro está selecionado.
 */
export default function BookCard({ book, onSelect, isSelected }) {
  return (
    <article
      className={`book-card ${isSelected ? 'book-card--selected' : ''}`}
      onClick={() => onSelect(book)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(book)}
      aria-label={`Selecionar livro: ${book.title}`}
      id={`book-card-${book.key?.replace(/\//g, '-')}`}
    >
      {/* Capa do livro */}
      <div className="book-card__cover">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`Capa de ${book.title}`}
            className="book-card__image"
            loading="lazy"
          />
        ) : (
          <div className="book-card__no-cover">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>Sem capa</span>
          </div>
        )}
      </div>

      {/* Informações do livro */}
      <div className="book-card__info">
        <h3 className="book-card__title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-card__authors">
          {book.authors.length > 0
            ? book.authors.slice(0, 2).join(', ')
            : 'Autor desconhecido'}
          {book.authors.length > 2 && ' e outros'}
        </p>
        {book.firstPublishYear && (
          <span className="book-card__year">{book.firstPublishYear}</span>
        )}
      </div>
    </article>
  );
}

import BookCard from './BookCard';

/**
 * Componente de lista de livros.
 * Renderiza os resultados da busca em um grid de BookCards.
 *
 * @param {Object} props
 * @param {Array} props.books - Lista de livros.
 * @param {Function} props.onSelectBook - Callback ao selecionar um livro.
 * @param {Object|null} props.selectedBook - Livro atualmente selecionado.
 */
export default function BookList({ books, onSelectBook, selectedBook }) {
  if (books.length === 0) return null;

  return (
    <section className="book-list" id="book-list">
      <h2 className="book-list__title">
        <span className="book-list__count">{books.length}</span> livros encontrados
      </h2>
      <div className="book-list__grid">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onSelect={onSelectBook}
            isSelected={selectedBook?.key === book.key}
          />
        ))}
      </div>
    </section>
  );
}

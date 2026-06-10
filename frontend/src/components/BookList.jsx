import BookCard from './BookCard';

export default function BookList({ books, onSelectBook, selectedBook }) {
  if (books.length === 0) return null;

  return (
    <section className="book-list" id="book-list">
      <p className="book-list__title">
        <span className="book-list__count">{books.length}</span> livros encontrados
      </p>
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
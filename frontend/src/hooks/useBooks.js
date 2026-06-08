import { useState, useCallback } from 'react';
import { searchBooks, LANGUAGE_NAMES } from '../services/openLibrary';
import { getCountriesByLanguage } from '../services/countriesApi';

/**
 * Hook customizado para gerenciar o estado da busca e seleção de livros.
 *
 * Centraliza toda a lógica de estado relacionada a:
 * - Busca de livros (query, resultados, loading, erro)
 * - Seleção de livro e detalhes
 * - Busca de países por idioma
 *
 * Decisão: Optamos por um hook único em vez de múltiplos hooks
 * para manter o fluxo de dados coeso e simplificar o gerenciamento
 * de estados interdependentes.
 */
export function useBooks() {
  // Estado da busca
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Estado do livro selecionado
  const [selectedBook, setSelectedBook] = useState(null);

  // Estado dos países
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [countriesError, setCountriesError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  /**
   * Realiza a busca de livros pelo título.
   * @param {string} query - Termo de busca.
   */
  const search = useCallback(async (query) => {
    if (!query || query.trim() === '') return;

    setLoading(true);
    setError(null);
    setBooks([]);
    setSelectedBook(null);
    setCountries([]);
    setCountriesError(null);
    setSelectedLanguage(null);
    setHasSearched(true);

    try {
      const results = await searchBooks(query);
      setBooks(results);

      if (results.length === 0) {
        setError('Nenhum livro encontrado para esta busca. Tente outro título.');
      }
    } catch (err) {
      setError(err.message || 'Erro ao buscar livros. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Seleciona um livro e busca os países relacionados ao seu idioma.
   * @param {Object} book - Livro selecionado da lista.
   */
  const selectBook = useCallback(async (book) => {
    setSelectedBook(book);
    setCountries([]);
    setCountriesError(null);
    setSelectedLanguage(null);

    // Verifica se o livro possui idioma informado
    if (!book.languages || book.languages.length === 0) {
      setCountriesError('Este livro não possui idioma informado. Não é possível exibir os países no mapa.');
      return;
    }

    // Usa o primeiro idioma da lista como idioma principal
    const primaryLang = book.languages[0];
    // A REST Countries v3.1 aceita o nome do idioma em inglês
    const langName = LANGUAGE_NAMES[primaryLang];

    if (!langName) {
      setCountriesError(
        `Idioma "${primaryLang}" não reconhecido. Não foi possível buscar os países correspondentes.`
      );
      return;
    }

    setSelectedLanguage(primaryLang);
    setCountriesLoading(true);

    try {
      const result = await getCountriesByLanguage(langName);

      if (result.length === 0) {
        setCountriesError('Nenhum país encontrado para o idioma deste livro.');
      } else {
        setCountries(result);
      }
    } catch (err) {
      setCountriesError(err.message || 'Erro ao buscar países. Tente novamente.');
    } finally {
      setCountriesLoading(false);
    }
  }, []);

  /**
   * Limpa a seleção atual do livro e os países.
   */
  const clearSelection = useCallback(() => {
    setSelectedBook(null);
    setCountries([]);
    setCountriesError(null);
    setSelectedLanguage(null);
  }, []);

  /**
   * Reseta todo o estado para o estado inicial.
   */
  const reset = useCallback(() => {
    setBooks([]);
    setLoading(false);
    setError(null);
    setHasSearched(false);
    setSelectedBook(null);
    setCountries([]);
    setCountriesLoading(false);
    setCountriesError(null);
    setSelectedLanguage(null);
  }, []);

  return {
    // Estado da busca
    books,
    loading,
    error,
    hasSearched,
    // Estado do livro selecionado
    selectedBook,
    // Estado dos países
    countries,
    countriesLoading,
    countriesError,
    selectedLanguage,
    // Ações
    search,
    selectBook,
    clearSelection,
    reset,
  };
}

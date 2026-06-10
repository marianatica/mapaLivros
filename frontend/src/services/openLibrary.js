/**
 * Serviço de integração com a Open Library API.
 * Responsável por buscar livros pelo título.
 *
 * API utilizada: https://openlibrary.org/search.json
 */

const BASE_URL = import.meta.env.VITE_OPEN_LIBRARY_BASE_URL || 'https://openlibrary.org';

/**
 * Busca livros pelo título na Open Library.
 * @param {string} query - Termo de busca (título do livro).
 * @param {number} limit - Número máximo de resultados (padrão: 12).
 * @returns {Promise<Array>} Lista de livros formatados.
 * @throws {Error} Em caso de falha na comunicação com a API.
 */
export async function searchBooks(query, limit = 12) {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search.json?title=${encodeURIComponent(query.trim())}&limit=${limit * 3}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API Open Library: ${response.status}`);
    }

    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      return [];
    }

    // Filtra apenas os livros que possuem idioma informado
    const docsWithLanguage = data.docs.filter((doc) => doc.language && doc.language.length > 0);

    // Limita ao número solicitado (padrão 12)
    const limitedDocs = docsWithLanguage.slice(0, limit);

    // Formata os resultados para o formato esperado pela aplicação
    return limitedDocs.map((doc) => ({
      key: doc.key,
      title: doc.title || 'Título desconhecido',
      authors: doc.author_name || [],
      firstPublishYear: doc.first_publish_year || null,
      languages: doc.language || [],
      coverId: doc.cover_i || null,
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      coverUrlLarge: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : null,
    }));
  } catch (error) {
    // Relança o erro com mensagem amigável
    if (error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar à Open Library. Verifique sua conexão.');
    }
    throw error;
  }
}

/**
 * Mapa de códigos de idioma ISO 639 para nomes legíveis.
 * Cobre os idiomas mais comuns encontrados na Open Library.
 */
export const LANGUAGE_NAMES = {
  eng: 'English',
  spa: 'Spanish',
  por: 'Portuguese',
  fre: 'French',
  ger: 'German',
  ita: 'Italian',
  rus: 'Russian',
  cmn: 'Chinese',
  jpn: 'Japanese',
  kor: 'Korean',
  ara: 'Arabic',
  hin: 'Hindi',
  dut: 'Dutch',
  swe: 'Swedish',
  nor: 'Norwegian',
  dan: 'Danish',
  fin: 'Finnish',
  pol: 'Polish',
  tur: 'Turkish',
  heb: 'Hebrew',
  tha: 'Thai',
  vie: 'Vietnamese',
  ind: 'Indonesian',
  may: 'Malay',
  cat: 'Catalan',
  cze: 'Czech',
  gre: 'Greek',
  hun: 'Hungarian',
  rum: 'Romanian',
  ukr: 'Ukrainian',
  bul: 'Bulgarian',
  hrv: 'Croatian',
  srp: 'Serbian',
  slv: 'Slovenian',
  slo: 'Slovak',
  lit: 'Lithuanian',
  lav: 'Latvian',
  est: 'Estonian',
  geo: 'Georgian',
  arm: 'Armenian',
  urd: 'Urdu',
  ben: 'Bengali',
  tam: 'Tamil',
  tel: 'Telugu',
  mar: 'Marathi',
  guj: 'Gujarati',
  kan: 'Kannada',
  mal: 'Malayalam',
  pan: 'Punjabi',
  per: 'Persian',
  wel: 'Welsh',
  gle: 'Irish',
  gla: 'Scottish Gaelic',
  lat: 'Latin',
  san: 'Sanskrit',
  mul: 'Múltiplos idiomas',
  und: 'Indefinido',
};

/**
 * Mapa de códigos ISO 639-2/B (usados pela Open Library)
 * para códigos ISO 639-1 (usados pela REST Countries API).
 * 
 * Decisão: A Open Library usa ISO 639-2/B (3 letras),
 * enquanto a REST Countries usa nomes de idiomas em inglês.
 * Este mapa faz a conversão necessária.
 */
export const ISO_639_2_TO_1 = {
  eng: 'en',
  spa: 'es',
  por: 'pt',
  fre: 'fr',
  ger: 'de',
  ita: 'it',
  rus: 'ru',
  chi: 'zh',
  jpn: 'ja',
  kor: 'ko',
  ara: 'ar',
  hin: 'hi',
  dut: 'nl',
  swe: 'sv',
  nor: 'no',
  dan: 'da',
  fin: 'fi',
  pol: 'pl',
  tur: 'tr',
  heb: 'he',
  tha: 'th',
  vie: 'vi',
  ind: 'id',
  may: 'ms',
  cat: 'ca',
  cze: 'cs',
  gre: 'el',
  hun: 'hu',
  rum: 'ro',
  ukr: 'uk',
  bul: 'bg',
  hrv: 'hr',
  srp: 'sr',
  slv: 'sl',
  slo: 'sk',
  lit: 'lt',
  lav: 'lv',
  est: 'et',
  geo: 'ka',
  arm: 'hy',
  urd: 'ur',
  ben: 'bn',
  tam: 'ta',
  tel: 'te',
  mar: 'mr',
  guj: 'gu',
  kan: 'kn',
  mal: 'ml',
  pan: 'pa',
  per: 'fa',
  wel: 'cy',
  gle: 'ga',
  gla: 'gd',
  lat: 'la',
  san: 'sa',
};

/**
 * Retorna o nome legível de um código de idioma.
 * @param {string} code - Código ISO 639-2/B do idioma.
 * @returns {string} Nome legível do idioma.
 */
export function getLanguageName(code) {
  return LANGUAGE_NAMES[code] || code;
}

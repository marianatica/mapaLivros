/**
 * Serviço de integração com a REST Countries API.
 * Responsável por buscar países por idioma.
 *
 * API utilizada: https://restcountries.com/v3.1/
 * 
 * Decisão técnica: Utilizamos o endpoint /lang/{code} que aceita
 * códigos ISO 639-1 (2 letras). A conversão dos códigos da Open Library
 * (ISO 639-2/B, 3 letras) é feita no serviço openLibrary.js.
 */

const BASE_URL = import.meta.env.VITE_REST_COUNTRIES_BASE_URL || 'https://restcountries.com/v3.1';

/**
 * Busca países que falam um determinado idioma.
 * @param {string} languageCode - Código ISO 639-1 do idioma (ex: 'en', 'pt').
 * @returns {Promise<Array>} Lista de países com dados relevantes.
 * @throws {Error} Em caso de falha na comunicação ou idioma não encontrado.
 */
export async function getCountriesByLanguage(languageCode) {
  if (!languageCode) {
    throw new Error('Código de idioma não fornecido.');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/lang/${encodeURIComponent(languageCode)}?fields=name,flags,latlng,cca2,cca3,capital,population,region,languages`
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Erro na API REST Countries: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Formata os dados dos países para uso na aplicação
    return data.map((country) => ({
      name: country.name?.common || 'País desconhecido',
      officialName: country.name?.official || '',
      flag: country.flags?.svg || country.flags?.png || '',
      flagAlt: country.flags?.alt || `Bandeira de ${country.name?.common}`,
      latlng: country.latlng || [0, 0],
      code: country.cca2 || '',
      code3: country.cca3 || '',
      capital: country.capital?.[0] || 'N/A',
      population: country.population || 0,
      region: country.region || 'N/A',
      languages: country.languages || {},
    }));
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Não foi possível conectar à REST Countries API. Verifique sua conexão.');
    }
    throw error;
  }
}

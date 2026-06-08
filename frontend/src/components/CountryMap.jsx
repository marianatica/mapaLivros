import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Componente para ajustar automaticamente o zoom e a posição do mapa
 * para exibir todos os marcadores.
 */
function FitBounds({ countries }) {
  const map = useMap();

  useEffect(() => {
    if (countries.length === 0) return;

    const bounds = L.latLngBounds(
      countries.map((c) => c.latlng)
    );

    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
  }, [countries, map]);

  return null;
}

/**
 * Cria um ícone customizado para o marcador do mapa
 * usando a bandeira do país como ícone.
 */
function createFlagIcon(flagUrl) {
  return L.divIcon({
    className: 'country-marker',
    html: `
      <div class="country-marker__pin">
        <img src="${flagUrl}" alt="" class="country-marker__flag" />
      </div>
    `,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  });
}

/**
 * Ícone padrão caso a bandeira não esteja disponível.
 */
const defaultIcon = L.divIcon({
  className: 'country-marker',
  html: `
    <div class="country-marker__pin country-marker__pin--default">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" fill="#6366f1" />
      </svg>
    </div>
  `,
  iconSize: [40, 48],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48],
});

/**
 * Componente de mapa interativo.
 * Exibe os países relacionados ao idioma do livro selecionado
 * usando React Leaflet e marcadores com bandeiras.
 *
 * @param {Object} props
 * @param {Array} props.countries - Lista de países para exibir no mapa.
 * @param {boolean} props.loading - Se os países estão sendo carregados.
 */
export default function CountryMap({ countries, loading }) {
  const [mapError, setMapError] = useState(false);

  if (mapError) {
    return (
      <div className="country-map__error" id="map-error">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
        <p>Não foi possível carregar o mapa.</p>
        <button onClick={() => setMapError(false)} className="country-map__retry">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section className="country-map" id="country-map">
      <h2 className="country-map__title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Países no Mapa
        <span className="country-map__badge">{countries.length}</span>
      </h2>

      {loading && (
        <div className="country-map__loading">
          <div className="spinner" />
          <p>Carregando países...</p>
        </div>
      )}

      <div className="country-map__container">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="country-map__leaflet"
          scrollWheelZoom={true}
          whenReady={() => setMapError(false)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            url={import.meta.env.VITE_MAP_TILE_URL || "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"}
          />

          {countries.map((country) => (
            <Marker
              key={country.code || country.name}
              position={country.latlng}
              icon={country.flag ? createFlagIcon(country.flag) : defaultIcon}
            >
              <Popup className="country-popup">
                <div className="country-popup__content">
                  <div className="country-popup__header">
                    {country.flag && (
                      <img
                        src={country.flag}
                        alt={country.flagAlt}
                        className="country-popup__flag"
                      />
                    )}
                    <h3 className="country-popup__name">{country.name}</h3>
                  </div>
                  <div className="country-popup__details">
                    <p><strong>Capital:</strong> {country.capital}</p>
                    <p><strong>Região:</strong> {country.region}</p>
                    <p><strong>População:</strong> {country.population.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds countries={countries} />
        </MapContainer>
      </div>

      {/* Lista de países abaixo do mapa */}
      {countries.length > 0 && (
        <div className="country-map__list">
          {countries.map((country) => (
            <div className="country-map__item" key={country.code || country.name}>
              {country.flag && (
                <img
                  src={country.flag}
                  alt={country.flagAlt}
                  className="country-map__item-flag"
                />
              )}
              <span className="country-map__item-name">{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getLanguageName } from '../services/openLibrary';

function FitBounds({ countries }) {
  const map = useMap();
  useEffect(() => {
    if (countries.length === 0) return;
    const bounds = L.latLngBounds(countries.map((c) => c.latlng));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
  }, [countries, map]);
  return null;
}

function createFlagIcon(flagUrl) {
  return L.divIcon({
    className: 'country-marker',
    html: `<div class="country-marker__pin"><img src="${flagUrl}" alt="" class="country-marker__flag" /></div>`,
    iconSize: [34, 40],
    iconAnchor: [17, 40],
    popupAnchor: [0, -42],
  });
}

const defaultIcon = L.divIcon({
  className: 'country-marker',
  html: `<div class="country-marker__pin"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg></div>`,
  iconSize: [34, 40],
  iconAnchor: [17, 40],
  popupAnchor: [0, -42],
});

export default function CountryMap({ countries, loading, selectedLanguage }) {
  const [mapError, setMapError] = useState(false);

  const languageLabel = selectedLanguage
    ? getLanguageName(selectedLanguage)
    : null;

  if (mapError) {
    return (
      <div className="country-map__error" id="map-error">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <div className="country-map__header">
        <h2 className="country-map__title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {languageLabel
            ? `Países que falam ${languageLabel}`
            : 'Países no mapa'}
          <span className="country-map__badge">{countries.length}</span>
        </h2>
      </div>

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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
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
              <span>{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
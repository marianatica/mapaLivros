/**
 * Componente para exibição de mensagens de erro amigáveis.
 * Apresenta diferentes ícones e estilos conforme o tipo de erro.
 *
 * @param {Object} props
 * @param {string} props.message - Mensagem de erro.
 * @param {string} props.type - Tipo do erro: 'error', 'warning', 'info'.
 * @param {Function} props.onRetry - Callback para tentar novamente (opcional).
 */
export default function ErrorMessage({ message, type = 'error', onRetry }) {
  if (!message) return null;

  const icons = {
    error: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  };

  return (
    <div className={`error-message error-message--${type}`} role="alert" id="error-message">
      <span className="error-message__icon">
        {icons[type] || icons.error}
      </span>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button
          className="error-message__retry"
          onClick={onRetry}
          id="retry-button"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

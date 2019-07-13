import PropTypes from 'prop-types';
import './Error500.css';

function Error500({ error }) {
  const hasMessage = error && error.message && error.message.length;

  return (
    <section className="Error500">
      <h1 className="Error500__title">500</h1>
      <h4 className="Error500__text">Something's broken.</h4>
      {hasMessage ? (
        <pre className="Error500__explanation">{error.message}</pre>
      ) : null}
    </section>
  );
}

Error500.propTypes = {
  error: PropTypes.object,
};

export default Error500;

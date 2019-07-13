import React from 'react';
import PropTypes from 'prop-types';
import Error404 from '../components/Error404';
import Error500 from '../components/Error500';

function Error({ statusCode, error }) {
  const fiveHundreds = [500, 501, 502, 503, 504];
  return (
    <>
      {statusCode === 404 && <Error404 />}
      {fiveHundreds.includes(statusCode) && <Error500 error={error} />}
    </>
  );
}

Error.getInitialProps = ({ res, err, error }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return { statusCode, error };
};

Error.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.object,
};

export default Error;

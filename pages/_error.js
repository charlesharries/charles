import React from 'react';
import PropTypes from 'prop-types';
import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/node';

function Error({ statusCode, hasGetInitialPropsRun, err }) {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
}

/**
 * Handle error page.
 *
 * @link https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
Error.getInitialProps = async ({ res, err, asPath, ...rest }) => {
  console.log({ res, err, asPath, rest });
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  console.log({ errorInitialProps });

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  console.log('no err object found for some reason');

  Sentry.captureException(new Error(`_error.js getInitialProps is missing data`));
  await Sentry.flush(2000);

  console.log('captured exception!');

  return errorInitialProps;
};

Error.propTypes = {
  statusCode: PropTypes.number,
  err: PropTypes.object,
  hasGetInitialPropsRun: PropTypes.bool,
};

export default Error;

import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import '../assets/css/base.css';
import * as Sentry from '@sentry/node';
import Head from '~components/Head';
import Nav from '~components/Nav';

import Links from '../components/Links';
import Scripts from '../components/Scripts';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dns: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHome = router.pathname === '/';
    const isError = router.pathname === '/_error';

    return (
      <>
        <div className="Page">
          <Head />
          <Nav />
          <Layout centered={isHome || isError}>
            <Component {...pageProps} key={router.pathname} />
          </Layout>
        </div>

        <Links />
        <Scripts />
      </>
    );
  }
}

function Layout({ children, centered }) {
  return <main className={centered ? 'Full' : 'Content'}>{children}</main>;
}

Layout.propTypes = {
  children: PropTypes.element,
  centered: PropTypes.bool,
};

export default MyApp;

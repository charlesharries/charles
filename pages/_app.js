import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import '../assets/css/base.css';
import Head from '~components/Head';
import Nav from '~components/Nav';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHome = router.pathname === '/';
    const isError = router.pathname === '/_error';

    return (
      <div className="Page">
        <Head />
        <Nav />
        <Layout centered={isHome || isError}>
          <Component {...pageProps} key={router.pathname} />
        </Layout>
      </div>
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

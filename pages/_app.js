import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import '../assets/css/base.css';
import Nav from '~components/Nav';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHome = router.pathname === '/';
    const isError = router.pathname === '/_error';

    return (
      <Container>
        <div className="Page">
          <Nav />
          <PageTransition timeout={300} classNames="fade">
            <Layout centered={isHome || isError}>
              <Component {...pageProps} key={router.pathname} />
            </Layout>
          </PageTransition>
        </div>
      </Container>
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

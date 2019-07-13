import React from 'react';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import '../assets/css/base.css';
import Nav from '~components/Nav';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isHome = router.pathname === '/';

    return (
      <Container>
        <div className="Page">
          <Nav />
          <main className={isHome ? 'Home' : 'Content'}>
            <PageTransition timeout={300} classNames="fade">
              <Component {...pageProps} key={router.pathname} />
            </PageTransition>
          </main>
        </div>
      </Container>
    );
  }
}

export default MyApp;

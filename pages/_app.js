import React from 'react';
import App, { Container } from 'next/app';
import { PageTransition } from 'next-page-transitions';
import '../assets/css/base.css';
import Nav from '~components/Nav';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const reg = new RegExp('/blog/?.+');
    const isBlogPost = reg.test(ctx.pathname);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isBlogPost, path: ctx.pathname };
  }

  render() {
    const { Component, pageProps, isBlogPost, path } = this.props;

    return (
      <Container>
        <div className="Page">
          <Nav />
          <PageTransition timeout={300} classNames="fade">
            {isBlogPost ? (
              <main className="Post">
                <Component {...pageProps} key={path} />
              </main>
            ) : (
              <Component {...pageProps} key={path} />
            )}
          </PageTransition>
        </div>
      </Container>
    );
  }
}

export default MyApp;

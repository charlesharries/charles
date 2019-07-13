import React from 'react';
import App, { Container } from 'next/app';
import { useRouter } from 'next/router';
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

    return { pageProps, isBlogPost };
  }

  render() {
    const { Component, pageProps, isBlogPost } = this.props;

    return (
      <Container>
        <div className="Page">
          <Nav />
          {isBlogPost ? (
            <main className="Post">
              <Component {...pageProps} />
            </main>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </Container>
    );
  }
}

export default MyApp;

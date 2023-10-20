import React from 'react';
import App from 'next/app';
import '../styles/globals.css';

import Layout from '../components/Layout'; // Assuming you have a Layout component

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
    );
  }
}

export default MyApp;

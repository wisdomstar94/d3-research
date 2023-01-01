'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>d3-research</title>
        <meta name="description" content="d3-research 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
    </div>
  )
};

export default IndexPage;

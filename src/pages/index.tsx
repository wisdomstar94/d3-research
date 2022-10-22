import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CommonLayout from '../components/layouts/common-layout/common-layout.component';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>d3-research</title>
        <meta name="description" content="d3-research 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <PageContents />
      </CommonLayout>
    </div>
  )
};

const PageContents = () => {
  return (
    <>

    </>
  );
};  

export default Home

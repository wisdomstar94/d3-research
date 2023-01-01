"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvParseRows } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-048-csvParseRows</title>
        <meta name="description" content="d3-048-csvParseRows 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <PageContents />
      </CommonLayout>
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    /*
      d3.csvParseRows 함수는 csv 포맷의 데이터를 행마다 배열로 변환해주는 함수입니다. 단순 value 에 ,(쉼표) 을 기준으로 배열로 반환됩니다.
    */
    const csvParseRowsResult = csvParseRows(`
name,price
apple,"70,000"
melon,"35,300"
    `.trim());
      console.log('csvParseRowsResult');
      console.log(csvParseRowsResult);
      /*
        0: (2) ['name', 'price']
        1: (2) ['apple', '70,000']
        2: (2) ['melon', '35,300']
      */
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

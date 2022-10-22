import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvParse } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-047-csvParse</title>
        <meta name="description" content="d3-047-csvParse 예시 코드 페이지입니다." />
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
      d3.csvParse 함수는 csv 포맷의 데이터를 js 데이터로 변환해주는 함수입니다. key - value 형태로 반환됩니다.
    */
    const csvParseResult = csvParse(`
name,price
apple,"70,000"
melon,"35,300"
    `.trim());
      console.log('csvParseResult');
      console.log(csvParseResult);
      /*
        0: {name: 'apple', price: '70,000'}
        1: {name: 'melon', price: '35,300'}
        columns: (2) ['name', 'price']
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

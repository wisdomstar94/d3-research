import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvFormatRows } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-045-csvFormatRows</title>
        <meta name="description" content="d3-045-csvFormatRows 예시 코드 페이지입니다." />
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
      d3.csvFormatRows 는 배열 데이터를 csv 포맷으로 변환해 주는 함수입니다.
    */
    const result = csvFormatRows([
      ['name', 'price'], 
      ['apple', '1,000'], 
      ['banana', '75,300']
    ]);
    console.log('result');
    console.log(result)
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

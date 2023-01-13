"use client"
import { interpolateDate } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatedate-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-212-interpolateDate</title>
        <meta name="description" content="d3-212-interpolateDate 예시 코드 페이지입니다." />
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
    while (boxElementRef.current?.hasChildNodes() === true) {
      if (boxElementRef.current?.firstChild !== null) {
        boxElementRef.current?.removeChild(boxElementRef.current?.firstChild);
      }
    }

    /*
      d3.interpolateDate 함수는 interpolator 함수에 지정된 값을 기준으로 
      날짜를 반환하는 interpolator 함수를 반환하는 데 사용됩니다. 
      이 함수는 Javascript 날짜 개체의 두 매개 변수를 사용합니다.
    */
    const date1 = new Date('2023-01-01 00:00:00');
    const date2 = new Date();
    // 즉, 두 날짜 사이에 대한 보간 함수가 반환됨!

    const i = interpolateDate(date1, date2);
    console.log(`i(0)`, i(0));
    console.log(`i(0.1)`, i(0.1));
    console.log(`i(0.3)`, i(0.3));
    console.log(`i(0.5)`, i(0.5));
    console.log(`i(0.8)`, i(0.8));
    console.log(`i(1)`, i(1));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

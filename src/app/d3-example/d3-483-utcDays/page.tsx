"use client"
import { utcDays } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-utcdays-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-483-utcDays</title>
        <meta name="description" content="d3-483-utcDays 예시 코드 페이지입니다." />
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
      d3.utcDays 함수는 UTC(Coordinated Universal Time)로 지정된 
      두 날짜 사이의 모든 날짜를 반환하는 데 사용됩니다.
    */
    const start = new Date(2022, 4, 5);
    const end = new Date(2022, 4, 10);

    const result = utcDays(start, end);
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

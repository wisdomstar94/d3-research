"use client"
import { timeDay } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-423-timeDay</title>
        <meta name="description" content="d3-423-timeDay 예시 코드 페이지입니다." />
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
      d3.timeDay 함수는 현지 시간의 일 간격; 
      일(예: 2012년 2월 7일 오전 12:00); 
      일반적으로 24시간. 
      일광 절약 시간제로 인해 현지 시간으로 23시간에서 25시간 사이일 수 있습니다.
    */
    console.log(`new Date()`, new Date());
    console.log(`timeDay(new Date())`, timeDay(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

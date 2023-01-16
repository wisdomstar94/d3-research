"use client"
import { timeFriday } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-428-timeFriday</title>
        <meta name="description" content="d3-428-timeFriday 예시 코드 페이지입니다." />
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
      d3.timeFriday 함수는 현지 시간으로 금요일 기반 주(예: 2012년 2월 10일 오전 12:00)의 주 간격. 
      7일에서 일반적으로 168시간.

      현지 시간으로 주간은 일광 절약 시간에 따라 167시간에서 169시간 사이입니다.
    */
    console.log(`new Date()`, new Date());
    console.log(`timeFriday(new Date())`, timeFriday(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

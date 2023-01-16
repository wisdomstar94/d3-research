"use client"
import { timeTickInterval } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-450-timeTickInterval</title>
        <meta name="description" content="d3-450-timeTickInterval 예시 코드 페이지입니다." />
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
      d3.timeTickInterval 함수는 동일한 인수가 지정된 d3.timeTicks에서 사용할 시간 간격을 반환합니다.
    */
    const tti = timeTickInterval(new Date('2023-01-01 00:00:00'), new Date('2023-05-09 15:24:57'), 3);
    console.log(`tti(new Date())`, tti!(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-462-timerFlush</title>
        <meta name="description" content="d3-462-timerFlush 예시 코드 페이지입니다." />
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
      d3.timerFlush 함수는 적합한 타이머 콜백을 즉시 호출합니다.
    */

    // 관련 자료 부족...

    // const timer = timeout(() => {
    //   console.log('4초후 실행!');
    // }, 4000);
    
    // setTimeout(() => {
    //   console.log('timerFlush()');
    //   timerFlush();
    // }, 1000);
    // console.log(`timerFlush`, timerFlush);
    // const a = timerFlush();
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

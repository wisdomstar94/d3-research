"use client"
import { utcTickInterval } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-506-utcTickInterval</title>
        <meta name="description" content="d3-506-utcTickInterval 예시 코드 페이지입니다." />
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
      d3.utcTickInterval 함수는 동일한 인수가 지정된 d3.utcTicks에서 사용할 시간 간격을 반환합니다. 
      시작 또는 중지가 잘못된 경우와 같이 연결된 간격이 없으면 null을 반환합니다.
    */
    const result = utcTickInterval(new Date(2023, 0, 1), new Date(2023, 1, 1), 3);
    if (result === null) {
      return;
    }

    console.log(`result(new Date)`, result(new Date));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

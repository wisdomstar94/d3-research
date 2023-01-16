"use client"
import { timeSecond } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-444-timeSecond</title>
        <meta name="description" content="d3-444-timeSecond 예시 코드 페이지입니다." />
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
      d3.timeSecond 함수는 날짜 이전이거나 같은 최신 간격 경계 날짜를 나타내는 새 날짜를 반환합니다. 
      간격과 같습니다.플로어(날짜가 지정되지 않은 경우), 기본값은 현재 시간입니다. 
      예를 들어 d3.time Year(날짜) 및 d3.time Year(날짜)가 있습니다.플로어(날짜)가 동일합니다.

      예를 들어, timeDay(날짜)는 일반적으로 지정된 날짜에 현지 시간으로 12:00 AM을 반환합니다.

      이 함수는 idempotent입니다. 
      지정한 날짜가 이미 현재 간격으로 플로어된 경우 동일한 시간을 가진 새 날짜가 반환됩니다. 
      또한 반환된 날짜는 관련 간격(예: 해당 간격)의 최소 표현 가능한 값입니다.
      마루를 깔다.floor(날짜) - 1)은 이전 간격 경계 날짜를 반환합니다.
    */
    console.log(`timeSecond(new Date())`, timeSecond(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

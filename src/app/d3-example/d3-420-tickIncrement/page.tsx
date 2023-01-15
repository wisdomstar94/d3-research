"use client"
import { tickIncrement } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-420-tickIncrement</title>
        <meta name="description" content="d3-420-tickIncrement 예시 코드 페이지입니다." />
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
      d3.tickIncrement 함수는 d3.tickStep과 마찬가지로 start가 항상 stop보다 작거나 같아야 하며 
      지정된 start, stop 및 count에 대한 tick step이 1보다 작으면 음의 역 tick step을 대신 반환합니다. 
      이 방법은 항상 정수를 반환하도록 보장되며, 
      반환된 눈금 값이 IEEE 754 부동 소수점에서 가능한 한 정확하게 표현되도록 하기 위해 d3.ticks에 의해 사용됩니다.
    */
    const result = tickIncrement(0, 100, 12);
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

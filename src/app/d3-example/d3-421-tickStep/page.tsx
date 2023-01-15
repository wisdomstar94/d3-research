"use client"
import { tickStep } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-421-tickStep</title>
        <meta name="description" content="d3-421-tickStep 예시 코드 페이지입니다." />
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
      d3.tickStep 함수는 동일한 인수가 d3.ticks에 전달된 경우 인접한 눈금 값 간의 차이를 반환합니다. 
      이 값은 1, 2 또는 5의 거듭제곱입니다.

      IEEE 754 부동소수점의 제한된 정밀도 때문에 반환되는 값은 정확한 소수가 아닐 수 있다.
    */
    const result = tickStep(0, 10, 3);
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

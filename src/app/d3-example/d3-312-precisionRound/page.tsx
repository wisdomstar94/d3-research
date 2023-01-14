"use client"
import { format, precisionRound } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-312-precisionRound</title>
        <meta name="description" content="d3-312-precisionRound 예시 코드 페이지입니다." />
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
      d3.precisionRound 함수는 지정된 숫자 단계 및 최대값이 지정된 경우 
      유의한 숫자로 반올림하는 형식 유형에 대해 제안된 10진수 정밀도를 반환합니다. 
      
      단계는 포맷할 값 간의 최소 절대 차이를 나타내고 max는 포맷할 값 중 가장 큰 절대 값을 나타냅니다. 
      (이것은 포맷할 값도 여러 단계로 가정합니다.) 
      
      예를 들어, 숫자 0.99, 1.0 및 1.01이 주어졌을 때, 
      단계는 0.01, 최대값은 1.01, 제안된 정밀도는 3이어야 합니다.
    */
    {
      const p = precisionRound(0.01, 1.01);
      const f = format(`.${p}r`);
      console.log(`f(0.99)`, f(0.99)); // "0.990"
      console.log(`f(1.0)`, f(1.0));  // "1.00"
      console.log(`f(1.01)`, f(1.01)); // "1.01"
    }

    {
      const p = precisionRound(0.1, 1.1);
      const f = format(`.${p}r`);
      console.log(`f(0.9)`, f(0.9)); // "0.90"
      console.log(`f(1.0)`, f(1.0)); // "1.0"
      console.log(`f(1.1)`, f(1.1)); // "1.1"
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

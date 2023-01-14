"use client"
import { scaleLog } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-scalelog-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-354-scaleLog</title>
        <meta name="description" content="d3-354-scaleLog 예시 코드 페이지입니다." />
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
      d3.scaleLog 함수는 지정된 도메인 및 범위, 베이스 10, 기본 보간기 및 
      클램핑이 비활성화된 새 연속 스케일을 구성합니다. 
      
      도메인을 지정하지 않으면 기본값은 [1, 10]입니다. 
      범위를 지정하지 않으면 기본값은 [0, 1]입니다.
    */
    
    const linear = 
      scaleLog()
      .domain([1, 10])
      .range([10, 20, 30, 40, 50, 60])
    ;

    console.log(`linear(0)`, linear(0));
    console.log(`linear(2)`, linear(2));
    console.log(`linear(4)`, linear(4));
    console.log(`linear(6)`, linear(6));
    console.log(`linear(8)`, linear(8));
    console.log(`linear(10)`, linear(10));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

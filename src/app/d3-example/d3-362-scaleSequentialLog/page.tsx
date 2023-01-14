"use client"
import { scaleSequentialLog } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-362-scaleSequentialLog</title>
        <meta name="description" content="d3-362-scaleSequentialLog 예시 코드 페이지입니다." />
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
      d3.scaleSequentialLog 함수는 로그 척도와 유사한 로그 변환이 있는 순차 척도입니다.

      첫 번째 제네릭은 스케일의 기초가 되는 보간기의 출력의 데이터 유형에 해당한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const linear = 
      scaleSequentialLog()
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

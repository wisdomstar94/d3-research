"use client"
import { interpolateRdYlBu, scaleSequentialQuantile } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-364-scaleSequentialQuantile</title>
        <meta name="description" content="d3-364-scaleSequentialQuantile 예시 코드 페이지입니다." />
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
      d3.scaleSequentialQuantile 함수는 p-분위수 변환을 사용하는 
      순차 척도로, 분위수 척도와 유사합니다.

      첫 번째 제네릭은 스케일의 기초가 되는 보간기의 출력의 데이터 유형에 해당한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const linear = 
      scaleSequentialQuantile(interpolateRdYlBu)
      .domain([0, 0.2, 0.5, 0.9])
      // .range([10, 20, 30, 40, 50, 60])
    ;

    console.log(`linear(0)`, linear(0));
    console.log(`linear(0.2)`, linear(0.2));
    console.log(`linear(0.4)`, linear(0.4));
    console.log(`linear(0.6)`, linear(0.6));
    console.log(`linear(0.8)`, linear(0.8));
    console.log(`linear(1)`, linear(1));

  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { tickFormat } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-419-tickFormat</title>
        <meta name="description" content="d3-419-tickFormat 예시 코드 페이지입니다." />
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
      d3.tickFormat 함수는 d3.tickStep에서 결정한 대로 
      눈금 값 사이의 고정 간격을 기반으로 적절한 정밀도를 자동으로 계산하여 
      눈금 값을 표시하는 데 적합한 숫자 형식 함수를 반환합니다.
    */
    const tf = tickFormat(0, 100, 12, "+%");
    console.log(`tf(0)`, tf(0));
    console.log(`tf(10)`, tf(10));
    console.log(`tf(20)`, tf(20));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

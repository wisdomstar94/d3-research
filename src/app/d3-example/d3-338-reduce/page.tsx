"use client"
import { reduce } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-338-reduce</title>
        <meta name="description" content="d3-338-reduce 예시 코드 페이지입니다." />
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
      d3.reduce 함수는 지정된 감소 함수에 의해 정의된 감소 값을 반환합니다. 
      이 함수는 실행 불가능한 각 값에 대해 반복적으로 호출되어 현재 감소 값과 다음 값을 전달합니다. 
      array.reduce에 해당.
    */

    const iterableData = new Set([0, 2, 3, 4]);
    const result = reduce(iterableData, (p, v) => p + v, 0);
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

"use client"
import { median } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-median-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-284-median</title>
        <meta name="description" content="d3-284-median 예시 코드 페이지입니다." />
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
      d3.median 함수는 지정된 배열 요소의 중앙값 또는 중간 지점을 반환하는 데 사용됩니다. 
      배열이 비어 있으면 undefined를 반환합니다.
    */
    const arr1 = [70, 80, 40, 100];
    console.log(`median(arr1)`, median(arr1));

    const arr2 = [0.8, 0.05, 0.4, 0.5];
    console.log(`median(arr2)`, median(arr2));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

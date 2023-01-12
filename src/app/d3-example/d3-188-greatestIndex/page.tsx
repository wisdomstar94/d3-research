"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { greatest, greatestIndex } from "d3";

// https://www.geeksforgeeks.org/d3-js-greatestindex-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-188-greatestIndex</title>
        <meta name="description" content="d3-188-greatestIndex 예시 코드 페이지입니다." />
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
      d3.greatestIndex 함수는 배열의 요소 중에 가장 큰 숫자의 인덱스를 반환하는 함수임.
    */
    
    const testArr = [
      80, // 0
      33, // 1
      2, // 2
      101, // 3 <---
      6, // 4
      51, // 5
    ];

    console.log(`greatestIndex(testArr)`, greatestIndex(testArr));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { merge } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-merge-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-285-merge</title>
        <meta name="description" content="d3-285-merge 예시 코드 페이지입니다." />
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
      d3.merge 함수는 주어진 두 배열을 단일 배열로 병합하는 데 사용됩니다.
    */
    const arr1 = [10, 20, 30];
    const arr2 = [1, 2, 3];

    const newArr = merge<number>([
      arr1,
      arr2,
    ]);
    console.log(`newArr`, newArr);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

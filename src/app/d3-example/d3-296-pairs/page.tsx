"use client"
import { pairs } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-296-pairs</title>
        <meta name="description" content="d3-296-pairs 예시 코드 페이지입니다." />
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
      d3.pairs 함수는 지정된 요소의 각 인접 쌍에 대해 순서대로 
      요소 i 및 요소 i - 1을 통과하는 지정된 감소기 함수를 호출합니다. 
      감소기를 지정하지 않으면 각 쌍에 대해 두 요소 배열을 만드는 함수가 기본값으로 설정됩니다.
    */

    const arr1 = [1, 2, 3, 4];
    console.log(`pairs(arr1)`, pairs(arr1));

    // const arr2 = [1, 2, 3, 4];
    console.log(`pairs(arr1, (a, b) => b -a)`, pairs(arr1, (a, b) => b -a));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

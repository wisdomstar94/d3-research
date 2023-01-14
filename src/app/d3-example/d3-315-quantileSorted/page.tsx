"use client"
import { quantileSorted } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-315-quantileSorted</title>
        <meta name="description" content="d3-315-quantileSorted 예시 코드 페이지입니다." />
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
      d3.quantileSorted 함수는 quantile와 비슷하지만 입력이 정렬된 값 배열이어야 합니다. 
      분위수와 대조적으로, 접근자는 분위수를 계산하는 데 필요한 요소에만 호출된다.
    */

    const arr = [0, 10, 30];
    console.log(`arr`, arr);

    console.log(`quantileSorted(arr, 0)`, quantileSorted(arr, 0)); // 0
    console.log(`quantileSorted(arr, 0.5)`, quantileSorted(arr, 0.5)); // 10
    console.log(`quantileSorted(arr, 1)`, quantileSorted(arr, 1)); // 30
    console.log(`quantileSorted(arr, 0.25)`, quantileSorted(arr, 0.25)); // 5
    console.log(`quantileSorted(arr, 0.75)`, quantileSorted(arr, 0.75)); // 20
    console.log(`quantileSorted(arr, 0.1)`, quantileSorted(arr, 0.1)); // 2
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

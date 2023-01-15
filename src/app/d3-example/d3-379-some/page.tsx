"use client"
import { some } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-379-some</title>
        <meta name="description" content="d3-379-some 예시 코드 페이지입니다." />
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
      d3.some 함수는 지정된 검정 함수가 지정된 해당 값에 대해 true를 반환하는 경우 true를 반환합니다. 
      이 메서드는 검정에서 실제 값을 반환하거나 모든 값이 반복되는 즉시 반환됩니다. 
      array.some에 해당합니다.
    */
    
    const arr1 = [2, 4, 6, 8];
    console.log(`arr1`, arr1);
    console.log(`some(arr1, (item, index) => item % 2 === 0))`, some(arr1, (item, index) => item % 2 === 0));

    const arr2 = [3, 1, 5, 9];
    console.log(`arr2`, arr2);
    console.log(`some(arr2, (item, index) => item % 2 === 0))`, some(arr2, (item, index) => item % 2 === 0));

  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

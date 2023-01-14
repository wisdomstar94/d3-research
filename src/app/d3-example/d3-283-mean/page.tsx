"use client"
import { mean } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-mean-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-283-mean</title>
        <meta name="description" content="d3-283-mean 예시 코드 페이지입니다." />
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
      d3.mean 함수는 지정된 숫자 테이블의 평균을 반환합니다. 
      테이블에 숫자가 없으면 정의되지 않은 값을 반환합니다. 
      옵션 접근자 함수를 지정할 수 있으며, 이는 평균을 계산하기 전에 Array.를 호출하는 것과 같습니다. 
      이 메서드는 정의되지 않은 값과 NaN 값을 무시합니다. 이 방법은 누락된 데이터를 무시하는 데 유용합니다.
    */
    const arr1 = [70, 80, 50, 100];
    console.log(`mean(arr1)`, mean(arr1));

    const arr2 = [0.8, 0.05, 0.4, 0.5];
    console.log(`mean(arr2)`, mean(arr2));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

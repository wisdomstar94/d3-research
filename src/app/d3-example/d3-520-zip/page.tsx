"use client"
import { zip } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-zip-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-520-zip</title>
        <meta name="description" content="d3-520-zip 예시 코드 페이지입니다." />
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
      d3.zip 함수는 배열 배열을 반환합니다. 
      여기서 i번째 배열은 각 인수 배열의 i번째 요소를 포함합니다. 
      반환된 배열은 배열에서 가장 짧은 배열까지 길이가 잘립니다. 
      배열이 단일 배열만 포함하는 경우 반환된 배열은 단일 요소 배열을 포함합니다. 
      인수가 없으면 반환된 배열이 비어 있습니다.
    */

    const arr1 = ["aa","ab","ac"];
    const arr2 = ["ac","ad","ah"];
    const arr3 = ["ae","af","ag"];
    const zips = zip(arr1, arr2, arr3);
    console.log(`zips`, zips);
    
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

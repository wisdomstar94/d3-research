"use client"
import { interpolateArray } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolate-array-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-200-interpolateArray</title>
        <meta name="description" content="d3-200-interpolateArray 예시 코드 페이지입니다." />
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
      d3.interpolate 두 배열을 보간하는 데 사용되며 두 배열 사이에 보간기를 반환합니다.
    */

    const arr1 = [12, 3];
    const arr2 = [4, 5, 6, 7];
    console.log('arr1', arr1);
    console.log('arr2', arr2);

    const intrArr = interpolateArray(arr1, arr2); // 함수가 리턴됨
    console.log(`intrArr(0.2)`, [...intrArr(0.2)]);
    console.log(`intrArr(0.4)`, [...intrArr(0.4)]);
    console.log(`intrArr(0.5)`, [...intrArr(0.5)]);
    console.log(`intrArr(0.7)`, [...intrArr(0.7)]);
    console.log(`intrArr(0.9)`, [...intrArr(0.9)]);
    console.log(`intrArr(1)`, [...intrArr(1)]);
    /*
      즉, 두 배열의 요소(숫자)의 중간 값을 가져올 때 유용할 듯! 
    */
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

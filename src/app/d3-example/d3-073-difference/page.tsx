"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { difference } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-073-difference</title>
        <meta name="description" content="d3-073-difference 예시 코드 페이지입니다." />
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
      d3.difference 는 다른 반복 테이블에 없는 반복 가능한 모든 값을 포함하는 새 InterSet을 반환합니다.
    */
    const array1 = [1, 900, 3, 400, 5, 600, 7, 8];
    console.log('array1', array1);

    const newArray = difference(array1, [900], [5, 7]); // array1 에서 900 과 5, 7 이 제거된 배열이 반환됩니다.
    console.log(`newArray`, newArray);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

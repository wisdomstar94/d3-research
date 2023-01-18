"use client"
import { union } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-481-union</title>
        <meta name="description" content="d3-481-union 예시 코드 페이지입니다." />
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
      d3.union 함수는 지정된 반복 가능한 항목에 나타나는 모든(고유한) 값이 포함된 새 InterSet을 반환합니다. 
      반환된 집합의 값 순서는 지정된 반복 가능한 항목에서 처음 발생한 값을 기준으로 합니다.
    */

    const result = union([0, 2, 1, 0], [1, 3]) // Set {0, 2, 1, 3}
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

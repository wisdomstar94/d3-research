"use client"
import { descending, sort } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-380-sort</title>
        <meta name="description" content="d3-380-sort 예시 코드 페이지입니다." />
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
      d3.sort 함수는 지정된 비교기 함수에 의해 정의된 정렬된 순서대로 
      지정된 테이블의 값을 포함하는 배열을 반환합니다. 
      비교기를 지정하지 않으면 기본값은 d3.ascending입니다. 
      array.sort와 동일하지만, 지정된 값을 변환하지 않으며, 
      비교기는 사전 순서 대신 자연 순서로 기본 설정됩니다.
    */

    const data = new Set([100, 2, 50, 1, 70]);  
    const result = sort(data);
    console.log(`result`, result);

    const result2 = sort(data, descending);
    console.log(`result2`, result2);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

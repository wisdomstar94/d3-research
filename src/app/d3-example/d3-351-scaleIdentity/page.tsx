"use client"
import { interpolateYlGn, scaleIdentity, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-scaleidentity-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-351-scaleIdentity</title>
        <meta name="description" content="d3-351-scaleIdentity 예시 코드 페이지입니다." />
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
      d3.scaleIdentity 함수는 지정한 도메인 및 범위를 사용하여 새 ID 척도를 구성합니다. 
      범위를 지정하지 않으면 기본값은 [0, 1]입니다.
      제네릭은 알 수 없는 값의 데이터 유형에 해당합니다.
    */
    
      const a = 
        scaleIdentity()
        .domain([0, 100])
        .range([0, 10])
      ;
   
      console.log(`a(0)`, a(0));
      console.log(`a(10)`, a(10));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

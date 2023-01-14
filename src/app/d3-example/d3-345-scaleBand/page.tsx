"use client"
import { scaleBand } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/d3-scaleband

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-345-scaleBand</title>
        <meta name="description" content="d3-345-scaleBand 예시 코드 페이지입니다." />
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
      d3.scaleBand 함수는 지정된 도메인과 범위, 패딩, 반올림 및 중앙 정렬을 사용하여 
      새 밴드 축척을 구성합니다. 
      도메인을 지정하지 않으면 기본적으로 빈 도메인으로 설정됩니다. 
      범위를 지정하지 않으면 기본적으로 단위 범위 [0, 1]로 설정됩니다.
    */

    const fn = 
      scaleBand()
      .domain(["one", "two", "three", "four", "five"])
      .range([0, 100])
    ;

    console.log(`fn("one")`, fn("one"));
    console.log(`fn("two")`, fn("two"));
    console.log(`fn("three")`, fn("three"));
    console.log(`fn("four")`, fn("four"));
    console.log(`fn("five")`, fn("five"));

    console.log(`fn.bandwidth()`, fn.bandwidth());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

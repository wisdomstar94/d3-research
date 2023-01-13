"use client"
import { interpolateRgbBasis, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatergbbasis-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-246-interpolateRgbBasis</title>
        <meta name="description" content="d3-246-interpolateRgbBasis 예시 코드 페이지입니다." />
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
      d3.interpolateRgbBasis 함수는  RGB 색상으로 변환된 지정된 
      색상 배열의 균일한 비합리적 B-스플라인 보간기 함수를 반환하는 데 사용됩니다.
    */
    const i = interpolateRgbBasis(["red", "white", "blue"]);
    
    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");

    function getT(index: number) {
      if (index === 0) return 0.1;
      if (index === 1) return 0.5;
      if (index === 2) return 1;
      return 1;
    }

    Array.from({ length: 3 }).forEach((_, inIndex) => {
      box
        .append("g")
        .append("circle")
        .attr("r", 10)
        .attr("cx", ((0 + 1) * 50) + (inIndex * 10))
        .attr("cy", ((0 + 1) * 50) + (inIndex * 10))
        .style("fill", i(getT(inIndex)));  
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

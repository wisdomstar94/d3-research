"use client"
import { interpolateYlGn, scaleDivergingLog, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-347-scaleDivergingLog</title>
        <meta name="description" content="d3-347-scaleDivergingLog 예시 코드 페이지입니다." />
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
      d3.scaleDivergingLog 함수는 로그 척도와 유사한 로그 변환이 있는 분기 척도입니다.
    */
    const fn = scaleDivergingLog(interpolateYlGn);
    console.log(`fn(0)`, fn(0));
    console.log(`fn(0.1)`, fn(0.1));
    console.log(`fn(0.2)`, fn(0.2));
    console.log(`fn(0.3)`, fn(0.3));
    console.log(`fn(0.4)`, fn(0.4));
    console.log(`fn(0.5)`, fn(0.5));
    console.log(`fn(0.6)`, fn(0.6));
    console.log(`fn(0.7)`, fn(0.7));
    console.log(`fn(0.8)`, fn(0.8));
    console.log(`fn(0.9)`, fn(0.9));
    console.log(`fn(1)`, fn(1));


    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      fn(0),
      fn(0.1),
      fn(0.2),
      fn(0.3),
      fn(0.4),
      fn(0.5),
      fn(0.6),
      fn(0.7),
      fn(0.8),
      fn(0.9),
      fn(1),
    ];
    console.log(`colors`, colors);

    colors.forEach((color, index) => {
      box
        .append("g")
        .append("circle")
        .attr("r", 10)
        .attr("cx", index * 15)
        .attr("cy", index * 15)
        .style("fill", color);  
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

"use client"
import { interpolateYlGn, scaleDivergingSymlog, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-350-scaleDivergingSymlog</title>
        <meta name="description" content="d3-350-scaleDivergingSymlog 예시 코드 페이지입니다." />
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
      d3.scaleDivergingSymlog 함수는 대칭 로그 변환이 있는 발산 척도로, 대칭 로그 척도와 유사합니다.

      제1 제네릭은 인터폴레이터 리턴 타입의 데이터 타입에 대응한다. 
      두 번째 제네릭은 알 수 없는 값의 데이터 유형에 해당한다.
    */
    const fn = scaleDivergingSymlog(interpolateYlGn);
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

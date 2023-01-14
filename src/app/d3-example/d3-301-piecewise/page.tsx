"use client"
import { interpolateRgb, piecewise, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-301-piecewise</title>
        <meta name="description" content="d3-301-piecewise 예시 코드 페이지입니다." />
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
      d3.piecewise 함수는 인접한 각 값 쌍에 대해 보간기를 구성하는 부분별 보간기를 반환합니다. 
      반환된 보간기는 [0, 1 / (n - 1)]의 t를 보간(값[0], 값[1])에 매핑하고, 
      [1 / (n - 1), 2 / (n - 1)]의 t를 보간(값[1], 값[2])에 매핑합니다. 
      여기서 n = values.length. 사실상, 이것은 가벼운 선형 척도입니다.
    */

    const interpolate = piecewise(interpolateRgb.gamma(2.2), ["red", "green", "blue"]);

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      interpolate(0),
      interpolate(0.1),
      interpolate(0.2),
      interpolate(0.3),
      interpolate(0.4),
      interpolate(0.5),
      interpolate(0.6),
      interpolate(0.7),
      interpolate(0.8),
      interpolate(0.9),
      interpolate(1),
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

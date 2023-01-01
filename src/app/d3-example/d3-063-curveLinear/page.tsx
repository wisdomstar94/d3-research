"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, curveLinear, line, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvelinear-method/
// https://github.com/d3/d3-shape#curveLinear

export declare namespace ID3CurveLinear {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-063-curveLinear</title>
        <meta name="description" content="d3-063-curveLinear 예시 코드 페이지입니다." />
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
      ※ 폴리 라인 : 연속하는 직선, 호를 이용하여 선을 그리는 방식으로 객체의 수에 상관없이 하나의 객체로 인식되는 선

      d3.curveLinear 는 지정된 점을 통과하는 폴리 라인을 생성합니다.
    */

    const data: ID3CurveLinear.Data[] = [
      {x: 0, y: 20},
      {x: 10, y: 15},
      {x: 20, y: 50},
      {x: 30, y: 35},
      {x: 40, y: 70},
      {x: 50, y: 115},
      {x: 60, y: 89},
      {x: 90, y: 60},
      {x: 125, y: 15},
    ];

    /* Area */
    const areaGenerator = area<ID3CurveLinear.Data>()
      .x((d) => d.x)
      .y1((d) => 50)
      .y0((d) => d.y)
      .curve(curveLinear)
      ;

    /* Line */
    const lineGenerator = line<ID3CurveLinear.Data>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveLinear)
    ;

    const svg1 = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300");
    const svg2 = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300");

    svg1
      .append("path")
      .attr("d", areaGenerator(data))
      .attr("fill", "green")
      .attr("stroke", "black")
    ;

    svg2
      .append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "green")
      .attr("stroke", "black")
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

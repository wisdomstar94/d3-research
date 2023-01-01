"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, curveCardinal, line, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvecardinal-method/
// https://github.com/d3/d3-shape#curveCardinal

export declare namespace ID3CurveCardinal {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-057-curveCardinal</title>
        <meta name="description" content="d3-057-curveCardinal 예시 코드 페이지입니다." />
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
      ※ 카디널 스플라인 : 더 큰 곡선을 형성하기 위해 조인된 개별 곡선의 시퀀스입니다.

      d3.curveCardinal 는 첫 번째 조각과 마지막 조각에 단측 차이가 사용된 지정된 제어점을 사용하여 3차 카디널 스플라인을 생성합니다. 기본 장력은 0입니다.
    */

    const data: ID3CurveCardinal.Data[] = [
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
    const areaGenerator = area<ID3CurveCardinal.Data>()
      .x((d) => d.x)
      .y1((d) => 50)
      .y0((d) => d.y)
      .curve(curveCardinal)
      ;

    /* Line */
    const lineGenerator = line<ID3CurveCardinal.Data>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveCardinal)
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

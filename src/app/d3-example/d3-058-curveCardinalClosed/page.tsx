"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, curveCardinalClosed, line, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvecardinalclosed-method/
// https://github.com/d3/d3-shape#curveCardinalClosed

export declare namespace ID3CurveCardinalClosed {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-058-curveCardinalClosed</title>
        <meta name="description" content="d3-058-curveCardinalClosed 예시 코드 페이지입니다." />
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

      d3.curveCardinalClosed 는 3차 카디널 스플라인을 생성합니다. 
      곡선은 또한 이러한 3차 카디널 스플라인을 기반으로 합니다. 
      이것은 데이터세트의 첫 번째 점과 마지막 점 사이에 곡선을 추가하는 닫힌 변형입니다.
    */

    const data: ID3CurveCardinalClosed.Data[] = [
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
    const areaGenerator = area<ID3CurveCardinalClosed.Data>()
      .x((d) => d.x)
      .y1((d) => 50)
      .y0((d) => d.y)
      .curve(curveCardinalClosed)
      ;

    /* Line */
    const lineGenerator = line<ID3CurveCardinalClosed.Data>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveCardinalClosed)
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

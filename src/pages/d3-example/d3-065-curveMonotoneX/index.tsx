import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, curveMonotoneX, line, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvemonotonex-method/
// https://github.com/d3/d3-shape#curveMonotoneX
 
export declare namespace ID3CurveMonotoneX {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-065-curveMonotoneX</title>
        <meta name="description" content="d3-065-curveMonotoneX 예시 코드 페이지입니다." />
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
      d3.curveMonotoneX 는 스테펜이 1차원의 단조 보간법을 위해 제안한 것처럼 x에서 단조성을 가정하여 y에서 단조성을 보존하는 입방체 스플라인을 생성한다.
      "스플리어스 진동 없이 주어진 데이터 점 집합을 통과하는 연속적인 1차 도함수를 가진 매끄러운 곡선. 
      국부 극한은 데이터에 의해 주어진 격자점에서만 발생할 수 있으며 인접한 두 격자점 사이에서는 발생하지 않는다."
    */

    const data: ID3CurveMonotoneX.Data[] = [
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
    const areaGenerator = area<ID3CurveMonotoneX.Data>()
      .x((d) => d.x)
      .y1((d) => 50)
      .y0((d) => d.y)
      .curve(curveMonotoneX)
      ;

    /* Line */
    const lineGenerator = line<ID3CurveMonotoneX.Data>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveMonotoneX)
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

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, curveCatmullRomClosed, line, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvecatmullromclosed-method/
// https://github.com/d3/d3-shape#curveCatmullRomClosed

export declare namespace ID3CurveCatmullRomClosed {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-061-curveCatmullRomClosed</title>
        <meta name="description" content="d3-061-curveCatmullRomClosed 예시 코드 페이지입니다." />
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
      d3.curveCatmullRomClosed 는 지정된 제어점과 매개변수 알파(기본값은 0.5)를 사용하여 닫힌 3차 Catmull-Rom 스플라인을 생성합니다. 
      선분이 끝나면 처음 세 개의 제어점이 반복되어 닫힌 루프를 생성합니다.
    */

    const data: ID3CurveCatmullRomClosed.Data[] = [
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
    const areaGenerator = area<ID3CurveCatmullRomClosed.Data>()
      .x((d) => d.x)
      .y1((d) => 50)
      .y0((d) => d.y)
      .curve(curveCatmullRomClosed)
      ;

    /* Line */
    const lineGenerator = line<ID3CurveCatmullRomClosed.Data>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(curveCatmullRomClosed)
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

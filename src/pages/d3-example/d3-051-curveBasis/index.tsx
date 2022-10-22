import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { scaleLinear, line, select, curveBasis } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvebasis-method/
// https://github.com/d3/d3-shape#curveBasis

export declare namespace ID3CurveBasis {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-051-curveBasis</title>
        <meta name="description" content="d3-051-curveBasis 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    /*
      d3.curveBasis 함수는 선에 곡률을 줄 때 사용되는 함수입니다. 주로 d3.line 의 curve 에 사용됩니다.
    */

    const data = [
      { x: 0, y: 0 },
      { x: 1, y: 3 },
      { x: 2, y: 15 },
      { x: 5, y: 15 },
      { x: 6, y: 1 },
      { x: 7, y: 5 },
      { x: 8, y: 1 }
    ];

    const xScale = scaleLinear()
      .domain([0, 8]).range([25, 175])
    ;
    
    const yScale = scaleLinear()
      .domain([0, 20])
      .range([175, 25])
    ;
    
    const lines = line<ID3CurveBasis.Data>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(curveBasis); // 여기서 d3.curveBasis 을 사용한다.
    ;

    select(boxElementRef.current)
      .append("svg")
      .attr("width", "300")
      .attr("height", "300")
      .append("path")
      .attr("d", lines(data))
      .attr("fill", "none")
      .attr("stroke", "green")
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

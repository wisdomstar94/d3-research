import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { scaleLinear, line, curveBasisOpen, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-curvebasisopen-method/
// https://github.com/d3/d3-shape#curveBasisOpen

export declare namespace ID3CurveBasisOpen {
  export interface Data {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-053-curveBasisOpen</title>
        <meta name="description" content="d3-053-curveBasisOpen 예시 코드 페이지입니다." />
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
      ※ 스플라인 곡선 : 인접한 두 점 사이에의 구간마다 별도의 다항식을 이용해 곡선을 정의하는 부드러운 곡선

      d3.curveBasisOpen 는 스플라인을 그릴 수 있는 데이터를 반환합니다. 첫 번째 지점과 마지막 지점의 연결을 생략하는 개방형 곡선입니다.
    */

    const data: ID3CurveBasisOpen.Data[] = [
      { x: 0, y: 0 },
      { x: 1, y: 3 },
      { x: 2, y: 15 },
      { x: 5, y: 15 },
      { x: 6, y: 1 },
      { x: 7, y: 5 },
      { x: 8, y: 1 },
    ];

    const xScale = scaleLinear()
      .domain([0, 8])
      .range([25, 175])
    ;
    
    const yScale = scaleLinear()
      .domain([0, 20])
      .range([175, 25])
    ;

    const lines = line<ID3CurveBasisOpen.Data>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(curveBasisOpen)
    ;
    
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 500)
    ;

    svg
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

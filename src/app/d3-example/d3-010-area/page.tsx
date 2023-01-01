"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { area, select, scaleLinear } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

interface Data {
  x: number;
  y: number;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-010-area</title>
        <meta name="description" content="d3-010-area 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    example1();
  }, []);

  function example1() {
    const data: Data[] = [
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
  
    // data.sort((a, b) => a.y - b.y);
    console.log('data', data);
  
    // const xScale = d3.scaleLinear().domain([0, 6]).range([25, 175]);
    // const yScale = d3.scaleLinear().domain([0, 20]).range([175, 25]);
  
    const areas = area<Data>()
      .x(d => d.x) // 좌표의 x 값
      .y0(50) // 영역을 그리는 y 축의 기준 값 (이 축을 기준으로 상, 하 영역이 구분됨.)
      .y1(d => d.y) // 좌표의 y 값
    ; 
  
    select(boxElementRef.current)
      .append("svg")
      .append("path")
      .attr("d", areas(data))
      .attr("fill", "green")
      .attr("stroke", "black");
  }

  function example2() {
    const scaleConverter = scaleLinear()
      .domain([0, 100]) 
      .range([0, 1000]) 
    ;
  
    /*
      반환되는 d3.ScaleLinear 에 인자는 domain 값이 들어가고 반환되는 값은 range 임.
      즉, scaleLinear 는 domain 을 입력 받아 range 를 반환하는 역할을 함.
    */
  
    console.log(`scaleConverter(0)`, scaleConverter(0)); // -> 0
    console.log(`scaleConverter(50)`, scaleConverter(50)); // -> 500
    console.log(`scaleConverter(100)`, scaleConverter(100)); // -> 1000
  }

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
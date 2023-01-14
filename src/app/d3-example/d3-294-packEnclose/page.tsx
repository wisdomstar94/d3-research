"use client"
import { packEnclose, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/d3-packenclose

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-294-packEnclose</title>
        <meta name="description" content="d3-294-packEnclose 예시 코드 페이지입니다." />
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
      d3.packEnclose 함수는 지정된 원 배열을 둘러싸는 가장 작은 원을 계산합니다. 
      각 원에는 원의 반지름을 지정하는 circle.r 속성과 
      원의 중심을 지정하는 circle.x 및 circle.y 속성이 있어야 합니다. 
      둘러싸는 원은 마투셰크-샤리르-웰즐 알고리즘을 사용하여 계산된다.
    */
    const width = 250;
    const height = 250;
    const circles = Array.from(
      {length: 20}, 
      () => ({
        x: ((Math.random() - 0.5) / 2 + 0.5) * width,
        y: ((Math.random() - 0.5) / 2 + 0.5) * height,
        r: (Math.random() + 0.5) * 20
      })
    );

    const enclosingCircle = packEnclose(circles);
    console.log('enclosingCircle', enclosingCircle);

    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    svg.append('g')
      .selectAll('circle.node')
      // .data(root.descendants())
      .data([enclosingCircle])
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', (d: any) => d.r)
      .attr("stroke", "#333")
      .attr("fill", "none")
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

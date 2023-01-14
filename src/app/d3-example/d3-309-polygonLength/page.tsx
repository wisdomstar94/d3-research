"use client"
import { polygonCentroid, polygonHull, polygonLength, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-309-polygonLength</title>
        <meta name="description" content="d3-309-polygonLength 예시 코드 페이지입니다." />
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
      d3.polygonLength 함수는 지정한 폴리곤의 둘레 길이를 반환합니다.
    */
    
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    const data: Array<[number, number]> = [
      [32, 35],
      [108, 34],
      [140, 110],
      [0, 111],
      [50, 150],
    ];

    const polygon = polygonHull(data);
    svg
    .append('g')
    .selectAll()
    .data(polygon ?? [])
    .enter()
    .append('circle')
    .attr('cx', d => d[0])
    .attr('cy', d=> d[1])
    .attr('r', 2)
    .attr('fill', '#333')
    ;

    console.log(`polygonLength(polygon)`, polygonLength(polygon ?? []));

    const point: [number, number] = polygonCentroid(data);
    console.log('point', point);

    svg
    .append('g')
    .append('circle')
    .attr('cx', point[0])
    .attr('cy', point[1])
    .attr('r', 2)
    .attr('fill', '#f00')
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

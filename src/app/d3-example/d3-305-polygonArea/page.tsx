"use client"
import { polygonArea, polygonCentroid, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://snyk.io/advisor/npm-package/d3-polygon/functions/d3-polygon.polygonCentroid

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-305-polygonArea</title>
        <meta name="description" content="d3-305-polygonArea 예시 코드 페이지입니다." />
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
      d3.polygonArea 함수는 지정한 폴리곤의 서명된 영역을 반환합니다. 
      다각형의 꼭짓점이 시계 반대 방향(원점 "0,0"이 왼쪽 상단 모서리에 있다고 가정)이면 반환되는 영역은 양수이고, 
      그렇지 않으면 음수 또는 0이다.
    */
    
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    const data: Array<[number, number]> = [
      [32, 35],
      [108, 34],
      [140, 110],
      [0, 111],
      [50, 150],
    ];
    data.forEach((point, index) => {
      svg
      .append('g')
      .append('circle')
      .attr('cx', point[0])
      .attr('cy', point[1])
      .attr('r', 2)
      .attr('fill', '#333')
    ;
    });


    const num = polygonArea(data);
    console.log('num', num);

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

    // 즉.. 원점을 기준으로 폴리곤이 어디에 위치하느냐에 따라 음수 또는 0 또는 양수가 반환되는 함수같음!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

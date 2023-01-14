"use client"
import { polygonCentroid, polygonHull, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-308-polygonHull</title>
        <meta name="description" content="d3-308-polygonHull 예시 코드 페이지입니다." />
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
      d3.polygonHull 함수는 Andrew의 모노톤 체인 알고리즘을 사용하여 지정한 점의 볼록 껍질을 반환합니다. 
      반환된 선체는 시계 반대 방향으로 배열된 입력 지점의 부분 집합을 포함하는 배열로 표시됩니다. 
      점의 요소가 3개 미만이면 null을 반환합니다.
    */
    
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    const data: Array<[number, number]> = [
      [32, 35],
      [108, 34],
      [140, 110],
      [0, 111],
      [50, 150],
    ];

    polygonHull(data)?.forEach((point, index) => {
      svg
      .append('g')
      .append('circle')
      .attr('cx', point[0])
      .attr('cy', point[1])
      .attr('r', 2)
      .attr('fill', '#333')
      ;
    });

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

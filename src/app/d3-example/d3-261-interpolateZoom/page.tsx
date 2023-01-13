"use client"
import { interpolateZoom, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-261-interpolateZoom</title>
        <meta name="description" content="d3-261-interpolateZoom 예시 코드 페이지입니다." />
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
      d3.interpolateZoom 함수는 
      "Smooth and Efficient Zooming and Panning" (매끄럽고 효율적인 확대축소 및 이동)을 기준으로 
      2차원 평면의 두 뷰 a와 b 사이에 보간기를 반환합니다. 
      
      각 보기는 cx, cy 및 width의 세 가지 숫자 배열로 정의됩니다. 
      처음 두 좌표 cx, cy는 뷰포트의 중심을 나타내고, 
      마지막 좌표 폭은 뷰포트의 크기를 나타냅니다.
    */

    const interpolator = interpolateZoom([30, 30, 40], [135, 85, 60]);
    const infos = [
      interpolator(0),
      interpolator(0.2),
      interpolator(0.4),
      interpolator(0.6),
      interpolator(0.8),
      interpolator(1),
    ];
    console.log(`infos`, infos);

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
    infos.forEach((info, index) => {
      box
        .append("g")
        .append("circle")
        .attr("r", info[2])
        .attr("cx", info[0])
        .attr("cy", info[1])
        .attr("stroke", 'black')
        .attr("fill", 'rgba(0,0,0,0)')
        .attr("stroke-width", 1); 
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

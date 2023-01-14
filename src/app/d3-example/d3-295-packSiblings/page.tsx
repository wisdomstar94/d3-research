"use client"
import { packSiblings, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-295-packSiblings</title>
        <meta name="description" content="d3-295-packSiblings 예시 코드 페이지입니다." />
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
      d3.packSiblings 함수는 각 원의 반지름을 지정하는 circle.r 속성이 있어야 하는 지정된 원 배열을 팩합니다. 
      원은 왕 외 연구진의 전면 체인 패킹 알고리듬에 따라 배치된다.
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

    const siblingCircle = packSiblings(circles);
    console.log('siblingCircle', siblingCircle);

    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    svg.append('g')
      .attr("transform", "translate(200, 200)")
      .selectAll('circle.node')
      // .data(root.descendants())
      .data(siblingCircle)
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

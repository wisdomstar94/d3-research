"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, easeBounceOut } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/easing-animations

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-088-easeBounceOut</title>
        <meta name="description" content="d3-082-easeBounceOut 예시 코드 페이지입니다." />
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
      d3.easeBounceOut 는 transition 의 ease 종류중 하나입니다.
    */

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300");
    
    const circle = svg
      .append('g')
      .append('circle')
      .attr('r', 10)
      .attr('cx', 20)
      .attr('cy', 20)
      .attr('style', 'fill: #f00')
      .transition()
      .ease(easeBounceOut)
      .duration(1000)
      .attr('cx', 100)
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

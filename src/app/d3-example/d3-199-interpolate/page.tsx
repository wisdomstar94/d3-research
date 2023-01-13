"use client"
import { interpolate, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-interpolate-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-199-interpolate</title>
        <meta name="description" content="d3-199-interpolate 예시 코드 페이지입니다." />
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
      d3.interpolate 주어진 두 값을 보간하는 데 사용됩니다. 
      색상의 경우 주어진 두 가지 색상에서 세 번째 색상을 형성하는 데 사용됩니다.
    */

    const intr = interpolate("red", "green"); // 함수가 리턴됨
    const intr1 = intr(0.1);
    const intr2 = intr(1);
    const intr3 = intr(0.4);
    console.log(`(intr1) intr(0.1)`, intr1);
    console.log(`(intr2) intr(1)`, intr2);
    console.log(`(intr3) intr(0.4)`, intr3);

    const box = select(boxElementRef.current).append("svg");
      
    box
      .append("g")
      .append("circle")
      .attr("r", 10)
      .attr("cx", 10)
      .attr("cy", 10)
      .style("fill", intr1);

    box
      .append("g")
      .append("circle")
      .attr("r", 10)
      .attr("cx", 30)
      .attr("cy", 30)
      .style("fill", intr2);

    box
      .append("g")
      .append("circle")
      .attr("r", 10)
      .attr("cx", 50)
      .attr("cy", 50)
      .style("fill", intr3);

    // 두개의 색상을 혼합한 색상 값을 구할 때 유용할 듯!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

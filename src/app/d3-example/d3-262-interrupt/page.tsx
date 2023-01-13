"use client"
import { interrupt, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interrupt-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-262-interrupt</title>
        <meta name="description" content="d3-262-interrupt 예시 코드 페이지입니다." />
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
      d3.interrupt 함수는 지정된 노드에서 지정된 이름의 활성 전환을 중단하고 
      지정된 이름으로 보류 중인 전환을 취소하는 데 사용됩니다.
      이 함수는 selection.interrupt() 함수와 유사합니다.
    */
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    const path = svg.append('path');

    path.attr

    const circle = svg
      .selectAll("circle")
      .data([1, 2, 3, 4])
      .enter()
      .append("circle")
      .style("fill", "red")
      .attr("cx", 50)
      .attr("cy", function(d) {
        return d * 50;
      })
      .attr("r", 25)
      .on("click", function() {
        interrupt(this)
      });

    circle
      .transition()
      .delay(function(d) {
        return d * 500;
      })
      .duration(function(d) {
        return d * 1000;
      })
      .attr("cx", 360)
      .on("interrupt", function() {
        console.log('interrupted!!', this);
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

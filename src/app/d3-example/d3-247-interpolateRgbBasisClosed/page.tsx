"use client"
import { interpolateRgbBasisClosed, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatergbbasisclosed-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-247-interpolateRgbBasisClosed</title>
        <meta name="description" content="d3-247-interpolateRgbBasisClosed 예시 코드 페이지입니다." />
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
      d3.interpolateRgbBasisClosed 함수는 색상 문자열을 포함하는 배열 입력을 통해 
      균일한 비합리적 B 척추 보간기를 반환하는 데 사용됩니다.
    */

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");

    const arr1 = ["blue", "white", "green"];
    const arr2 = ["black", "orange"];
    {
      const linearInterpolator = interpolateRgbBasisClosed(arr1);
      const colors = [
        linearInterpolator(0),
        linearInterpolator(0.1),
        linearInterpolator(0.3),
        linearInterpolator(0.5),
        linearInterpolator(0.7),
        linearInterpolator(0.9),
        linearInterpolator(1),
      ];
      console.log('colors', colors);
      colors.forEach((color, index) => {
        box
          .append("g")
          .append("circle")
          .attr("r", 10)
          .attr("cx", index * 15)
          .attr("cy", index * 15)
          .style("fill", color);  
      });
    }
    {
      const linearInterpolator = interpolateRgbBasisClosed(arr2);
      const colors = [
        linearInterpolator(0),
        linearInterpolator(0.1),
        linearInterpolator(0.3),
        linearInterpolator(0.5),
        linearInterpolator(0.7),
        linearInterpolator(0.9),
        linearInterpolator(1),
      ];
      console.log('colors', colors);
      colors.forEach((color, index) => {
        box
          .append("g")
          .append("circle")
          .attr("r", 10)
          .attr("cx", index * 15)
          .attr("cy", (index * 15) + 30)
          .style("fill", color);  
      });
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

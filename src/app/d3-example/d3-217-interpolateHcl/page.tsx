"use client"
import { interpolateHcl, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatehcl-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-217-interpolateHcl</title>
        <meta name="description" content="d3-217-interpolateHcl 예시 코드 페이지입니다." />
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
      d3.interpolateHcl 함수는 두 색상 값 사이에서 CIELCh ab 색상 공간 보간기 함수를 반환하는 데 사용됩니다. 
      주어진 두 가지 색상은 문자열 형식이며 d3.hcl() 함수를 사용하여 CIELCh ab 형식으로 변환됩니다.
    */
    
    const icx1 = interpolateHcl("blue", "white");
    const icx2 = interpolateHcl("pink", "orange");
    const icx3 = interpolateHcl("red", "black");
    // 즉, 두 색상 사이의 보간기 함수가 반환됨!

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      icx1,
      icx2,
      icx3,
    ];

    function getT(index: number) {
      if (index === 0) return 0.1;
      if (index === 1) return 0.5;
      if (index === 2) return 1;
      return 1;
    }

    colors.forEach((color, index) => {
      Array.from({ length: 3 }).forEach((_, inIndex) => {
        box
          .append("g")
          .append("circle")
          .attr("r", 10)
          .attr("cx", ((index + 1) * 50) + (inIndex * 10))
          .attr("cy", ((index + 1) * 50) + (inIndex * 10))
          .style("fill", color(getT(inIndex)));  
      });
      
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

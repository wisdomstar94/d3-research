"use client"
import { interpolateHue, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-221-interpolateHue</title>
        <meta name="description" content="d3-221-interpolateHue 예시 코드 페이지입니다." />
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
      d3.interpolateHue 함수는 두 색상 각도 a와 b 사이에 보간기를 반환합니다. 
      색상 중 하나가 NaN이면 반대 값이 사용됩니다. 
      색조 사이의 최단 경로가 사용됩니다. 
      보간기의 반환 값은 [0, 360]의 숫자입니다.
    */
    
    const icx1 = interpolateHue(0, 100);
    const icx2 = interpolateHue(100, 200);
    const icx3 = interpolateHue(200, 300);
    // 각도가 반환됨.

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      icx1,
      icx2,
      icx3,
    ];

    function getT(index: number) {
      if (index === 0) return 10;
      if (index === 1) return 50;
      if (index === 2) return 100;
      return 1;
    }

    colors.forEach((color, index) => {
      Array.from({ length: 3 }).forEach((_, inIndex) => {
        console.log(`color(getT(inIndex))`, color(getT(inIndex)));
        // box
        //   .append("g")
        //   .append("circle")
        //   .attr("r", 10)
        //   .attr("cx", ((index + 1) * 50) + (inIndex * 10))
        //   .attr("cy", ((index + 1) * 50) + (inIndex * 10))
        //   .style("fill", color(getT(inIndex)));  
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

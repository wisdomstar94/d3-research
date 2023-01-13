"use client"
import { interpolateCubehelix, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolatecubehelix-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-209-interpolateCubehelix</title>
        <meta name="description" content="d3-209-interpolateCubehelix 예시 코드 페이지입니다." />
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
      d3.interpolateCubehelix 함수는 구성 가능한 감마를 사용하여 
      두 색상 a와 b 사이의 큐브 나선 색 공간 보간기를 반환합니다. 
      감마를 지정하지 않으면 기본값은 1.0입니다. 
      
      색상 a와 b는 큐브 나선에 있을 필요가 없으며 
      d3.cubehelix 을 사용하여 큐브 나선으로 변환됩니다. 
      
      색상 또는 채도가 NaN이면 반대 색상의 채널 값이 사용됩니다. 
      색조 사이의 최단 경로가 사용됩니다. 인터폴레이터의 반환 값은 RGB 문자열입니다.
    */
    
    const icx1 = interpolateCubehelix("blue", "white");
    const icx2 = interpolateCubehelix("pink", "orange");
    const icx3 = interpolateCubehelix("red", "black");
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

"use client"
import { interpolateSpectral, scaleDiverging, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-scalediverging-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-346-scaleDiverging</title>
        <meta name="description" content="d3-346-scaleDiverging 예시 코드 페이지입니다." />
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
      d3.scaleDiverging 함수는 지정된 도메인 및 보간기 함수 또는 배열을 사용하여 
      새 분기 척도를 구성합니다. 도메인을 지정하지 않으면 기본값은 [0, 0.5, 1]입니다. 
      보간기를 지정하지 않으면 기본적으로 ID 함수가 사용됩니다. 
      척도가 적용되면 인터폴레이터가 일반적으로 [0, 1] 범위의 값으로 호출됩니다. 
      여기서 0은 극단 음의 값, 0.5는 중립 값, 1은 극단 양의 값을 나타냅니다.
    */

    const spectral = scaleDiverging(interpolateSpectral);
    console.log(`spectral(0)`, spectral(0.1));
    console.log(`spectral(2)`, spectral(0.2));
    console.log(`spectral(4)`, spectral(0.3));
    console.log(`spectral(6)`, spectral(0.4));
    console.log(`spectral(8)`, spectral(0.5));


    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      spectral(0),
      spectral(0.1),
      spectral(0.2),
      spectral(0.3),
      spectral(0.4),
      spectral(0.5),
      spectral(0.6),
      spectral(0.7),
      spectral(0.8),
      spectral(0.9),
      spectral(1),
    ];
    console.log(`colors`, colors);

    colors.forEach((color, index) => {
      box
        .append("g")
        .append("circle")
        .attr("r", 10)
        .attr("cx", index * 15)
        .attr("cy", index * 15)
        .style("fill", color);  
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

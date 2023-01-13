"use client"
import { interpolateRainbow, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-238-interpolateRainbow</title>
        <meta name="description" content="d3-238-interpolateRainbow 예시 코드 페이지입니다." />
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
      d3.interpolateRainbow 함수는 [0,1] 범위의 숫자 t가 지정되면 
      d3.interpolateWarm 스케일에서 [0.0,0.5]의 해당 색상을 반환한 다음 
      [0.5,1.0]의 d3.interpolateCool 스케일을 반환하여 주기적으로 덜 화난 무지개 색상 체계를 구현합니다.
    */
    
    const color0 = interpolateRainbow(0);
    const color1 = interpolateRainbow(0.1);
    const color2 = interpolateRainbow(0.2);
    const color3 = interpolateRainbow(0.3);
    const color4 = interpolateRainbow(0.4);
    const color5 = interpolateRainbow(0.5);
    const color6 = interpolateRainbow(0.6);
    const color7 = interpolateRainbow(0.7);
    const color8 = interpolateRainbow(0.8);
    const color9 = interpolateRainbow(0.9);
    const color10 = interpolateRainbow(1);

    const box = select(boxElementRef.current).append("svg").attr("width", "100%").attr("height", "100%");
      
    const colors = [
      color0,
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color8,
      color9,
      color10,
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

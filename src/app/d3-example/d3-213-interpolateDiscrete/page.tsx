"use client"
import { interpolateDiscrete, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-213-interpolateDiscrete</title>
        <meta name="description" content="d3-213-interpolateDiscrete 예시 코드 페이지입니다." />
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
      d3.interpolateDiscrete 함수는 지정된 값 배열에 대해 개별 보간기를 반환합니다. 
      반환된 인터폴레이터는 
      [0, 1/n]의 t를 [0] 값에 매핑하고, 
      [1/n, 2/n)의 t를 [1] 값에 매핑합니다. 
      
      여기서 n = values.length. 사실상, 이것은 [0, 1]의 고정 도메인을 가진 경량 양자화 척도이다.
    */
      
    const colorArr = [
      "#7e1900",
      "#92da27",
      "#17bbad",
      "#1f97dc",
      "#de501d",
      "#42342f",
      "#97d5a5",
      "#ff0000",
    ];

    const i = interpolateDiscrete(colorArr);

    const color0 = i(0);
    const color1 = i(0.1);
    const color2 = i(0.2);
    const color3 = i(0.3);
    const color4 = i(0.4);
    const color5 = i(0.5);
    const color6 = i(0.6);
    const color7 = i(0.7);
    const color8 = i(0.8);
    const color9 = i(0.9);
    const color10 = i(1);

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

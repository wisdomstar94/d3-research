"use client"
import { interpolatePlasma, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-interpolateplasma-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-232-interpolatePlasma</title>
        <meta name="description" content="d3-232-interpolatePlasma 예시 코드 페이지입니다." />
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
      d3.interpolatePlasma 함수는 [0,1] 범위의 숫자 t가 주어지면 
      반 데어 월트와 스미스가 설계한 지각적으로 균일한 색 체계에서 해당하는 색을 반환하며, RGB 문자열로 표현된다.
    */
    
    const color0 = interpolatePlasma(0);
    const color1 = interpolatePlasma(0.1);
    const color2 = interpolatePlasma(0.2);
    const color3 = interpolatePlasma(0.3);
    const color4 = interpolatePlasma(0.4);
    const color5 = interpolatePlasma(0.5);
    const color6 = interpolatePlasma(0.6);
    const color7 = interpolatePlasma(0.7);
    const color8 = interpolatePlasma(0.8);
    const color9 = interpolatePlasma(0.9);
    const color10 = interpolatePlasma(1);

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

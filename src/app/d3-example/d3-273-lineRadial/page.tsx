"use client"

import { lineRadial, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-lineradial-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-273-lineRadial</title>
        <meta name="description" content="d3-273-lineRadial 예시 코드 페이지입니다." />
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
      d3.lineRadial 함수는 기본 설정으로 새 방사형 라인 생성기를 구성하는 데 사용됩니다. 
      그런 다음 방사형 선 생성기를 사용하여 방사형 선을 만듭니다.
    */
    
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    const lineRadialGenerator = lineRadial();
    const data = [
      [0, 10],
      [3.14 * .5, 35],
      [3.14 * .75, 55],
      [3.14, 60],
      [3.14 * 1.25, 65],
      [3.14 * 1.5, 70],
      [3.14 * 1.75, 75],
      [3.14 * 2, 80],
      [3.14 * 2.25, 85],
      [3.14 * 2.5, 90],
      [3.14 * 2.75, 95],
      [3.14 * 3, 100],
      [3.14 * 3.25, 105],
      [3.14 * 3.5, 110]
    ] as [number, number][];

    const a = lineRadialGenerator(data);

    svg
      .append("g")
      .attr("transform", "translate(100 100)")
      .append("path")
      .attr("d", a)
      .attr("fill", "none")
      .attr("stroke", "green")
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

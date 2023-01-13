"use client"

import { line, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-line-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-272-line</title>
        <meta name="description" content="d3-272-line 예시 코드 페이지입니다." />
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
      d3.line 함수는 기본 설정으로 새 라인 생성기를 구성하는 데 사용됩니다. 
      그런 다음 라인 생성기를 사용하여 라인을 만듭니다.
    */
    
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    const lineGenerator = line();
    const points = [
      [0, 100],
      [500, 100],    
    ] as [number, number][];
  
    const pathOfLine = lineGenerator(points);
  
    svg.append('path')
      .attr('d', pathOfLine)
      .attr("fill", "none")
      .attr("stroke", "blue")
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

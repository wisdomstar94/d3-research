"use client"
import { path, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-298-path</title>
        <meta name="description" content="d3-298-path 예시 코드 페이지입니다." />
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
      d3.path 함수는 D3 경로 직렬화를 구성합니다.
    */
    const d3Path = path();
    d3Path.rect(100, 100, 150, 224);

    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    svg.append('g')
      .append('path')
      .attr("d", d3Path.toString())
      .attr("stroke", "#333")
      .attr("fill", "#333")
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

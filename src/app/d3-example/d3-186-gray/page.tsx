"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { select, gray } from "d3";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-186-gray</title>
        <meta name="description" content="d3-186-gray 예시 코드 페이지입니다." />
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

    // console.log('gray', gray(50, 1));
    const width = 400;
    const height = 400;
    const color = gray(50, 1);

    select(boxElementRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('circle')
      .attr('r', 18)
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('fill', color.toString())
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

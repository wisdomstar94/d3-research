"use client"
import { select, symbol, symbolCross } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-402-symbolCross</title>
        <meta name="description" content="d3-402-symbolCross 예시 코드 페이지입니다." />
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
      d3.symbolCross 함수는 같은 길이의 팔을 가진 그리스 십자가 기호 유형으로, 채우기 위한 것입니다.
    */
    
    const symbolFn = symbol(symbolCross, 10);
    console.log(`symbolFn()`, symbolFn());

    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
    ;

    svg
    .append('g')
    .attr('transform', 'translate(100, 100) scale(20)')
    .append('path')
    .attr('d', symbolFn())
    .attr('fill', '#d53737')
    .attr('stroke', '#333')
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

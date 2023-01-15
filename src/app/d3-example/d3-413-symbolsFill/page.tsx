"use client"
import { select, symbol, symbolsFill } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-413-symbolsFill</title>
        <meta name="description" content="d3-413-symbolsFill 예시 코드 페이지입니다." />
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
      d3.symbolsFill 는 채우기를 위해 설계된 기호 유형 집합
      (원, 십자, 다이아몬드, 사각형, 별, 삼각형 및 와이)을 포함하는 배열입니다. 
      범주형 데이터에 형상 인코딩을 사용하려는 경우 순서형 척도의 범위를 구성하는 데 유용합니다.
    */
    console.log(`symbolsFill`, symbolsFill);
    
    const symbolFn = symbol(symbolsFill[3], 10);
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

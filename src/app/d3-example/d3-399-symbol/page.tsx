"use client"
import { select, symbol, symbols, symbolsFill } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-399-symbol</title>
        <meta name="description" content="d3-399-symbol 예시 코드 페이지입니다." />
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
      d3.symbol 함수는 지정한 유형 및 크기의 새 기호 생성기를 구성합니다. 
      지정하지 않은 경우 원에 기본값을 입력하고 크기를 기본값으로 64로 입력합니다.

      첫 번째 제네릭은 심볼 생성기가 호출되는 "this" 컨텍스트에 해당합니다. 
      두 번째 제네릭은 심볼의 기초가 되는 데이텀의 데이터 타입에 대응한다.
    */
    console.log(`symbolsFill`, symbolsFill);
    const symbolFn = symbol(symbolsFill[0], 10);
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

"use client"
import { select, symbol, symbolPlus } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-405-symbolPlus</title>
        <meta name="description" content="d3-405-symbolPlus 예시 코드 페이지입니다." />
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
      d3.symbolPlus 함수는 지정된 인수에 대한 기호를 생성합니다.

      중요: 심볼 생성기의 렌더링 컨텍스트가 null이면 심볼이 경로 데이터 문자열로 반환됩니다.

      이 함수가 호출되는 "이" 컨텍스트는 생성기의 접근자 메서드가 호출되는 컨텍스트입니다. 
      이 함수에 전달된 모든 인수는 생성기의 접근자 함수로 전달됩니다.

      예를 들어, 기본 설정을 사용하면 영역이 64제곱 픽셀인 원을 생성하는 데 인수가 필요하지 않습니다.
    */
    
    const symbolFn = symbol(symbolPlus, 10);
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

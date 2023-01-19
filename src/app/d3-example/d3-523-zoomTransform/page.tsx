"use client"
import { select, symbol, symbolPlus, zoom, zoomIdentity, zoomTransform } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-zoomtransform-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-523-zoomTransform</title>
        <meta name="description" content="d3-523-zoomTransform 예시 코드 페이지입니다." />
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
      d3.zoomTransform 함수는 지정한 노드에 대한 현재 변환을 반환합니다. 
      노드는 일반적으로 선택이 아닌 DOM 요소여야 합니다. 
      (선택은 서로 다른 상태의 여러 노드로 구성될 수 있으며, 이 함수는 단일 변환만 반환합니다.)
    */
    const symbolFn = symbol(symbolPlus, 10);

    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
    ;

    const g = svg
      .append('g');

    

    const _zoom = zoom<SVGSVGElement, any>().on("zoom", function zoom_actions(){
      this.setAttribute("transform", zoomTransform(this).toString());
    });

    zoomTransform

    svg
    .call(_zoom)
    .call(_zoom.transform, zoomIdentity)
    ;

    g.append('g')
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

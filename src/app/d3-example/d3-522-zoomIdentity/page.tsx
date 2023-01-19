"use client"
import { select, symbol, symbolPlus, zoom, zoomIdentity } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-522-zoomIdentity</title>
        <meta name="description" content="d3-522-zoomIdentity 예시 코드 페이지입니다." />
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
      d3.zoomIdentity 는 ID 변환. 여기서 k = 1, tx = ty = 0입니다.
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

    const _zoom = zoom<SVGSVGElement, any>().on("zoom", (e: any) => {
      console.log('zoom.e', e);
      const transform = e.transform; // {k: 1, x: -4, y: -85}
      g.attr("transform", `translate(${transform.x} ${transform.y}) scale(${transform.k})`)
    });

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

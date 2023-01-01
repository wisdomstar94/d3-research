"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, json, geoPath, geoAlbers } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-geo-projection#geoalbers
// https://www.geeksforgeeks.org/d3-js-geoalbers-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-138-geoAlbers</title>
        <meta name="description" content="d3-138-geoAlbers 예시 코드 페이지입니다." />
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
      d3.geoAlbers
      => Albers 등면적 원뿔 투영을 그리는 데 사용됩니다. 
        Heinrich C. Albers 의 이름을 따서 명명된 Albers 투영법은 두 개의 표준 평행선을 사용하는 원뿔형 동일 영역 지도 투영법입니다. 
        축척과 모양이 유지되지 않고 표준 평행선 사이의 왜곡이 최소화됩니다. 그것은 geojson 데이터에서 geoAlbers 투영을 그립니다.
    */
    
    const width = 800;
    const height = 400;

    const svg = select(boxElementRef.current).append('svg')
      .attr('width', width)
      .attr('height', height)
    ;

    const gfg = geoAlbers()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height])
    ;

    json("https://raw.githubusercontent.com/janasayantan/datageojson/master/geoasia.json").then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "black")
        .attr("d", geoPath().projection(gfg) as any)
        .style("stroke", "#ffff")
      ;
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

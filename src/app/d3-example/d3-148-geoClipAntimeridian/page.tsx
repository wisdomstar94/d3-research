"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoCentroid, select, geoMercator, json, geoPath, geoAzimuthalEqualArea, geoOrthographic, geoGraticule, geoClipCircle, geoClipAntimeridian } from "d3";

// https://www.appsloveworld.com/d3js/100/7/d3-geo-projection-transitions-from-orthographic-to-x

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-148-geoClipAntimeridian</title>
        <meta name="description" content="d3-148-geoClipAntimeridian 예시 코드 페이지입니다." />
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
      d3.geoClipAntimeridian 함수는 반경선을 가로지르는 기하학적 구조(선 또는 다각형)가 
      각 면에 하나씩 둘로 절단되도록 스트림을 변환하는 클리핑 함수입니다. 일반적으로 사전 클리핑에 사용됩니다.
    */
    
      const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);

    const clip = Math.PI;

    // AzimuthalEqualArea projection
    const projection = geoMercator()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2])
      .preclip(function(stream){
        stream = geoClipAntimeridian(stream); // cut antimeridian
        return geoClipCircle(1.2)(stream);   // apply clip angle
      })
    ;

    const geoGenerator = geoPath()
      .projection(projection);

    // Loading the json data  
    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    const graticule = geoGraticule();

    json(targetUrl[2]).then((data: any) => {
      // svg.append("g")
      //   .attr("d", geoGenerator(graticule())?.toString())
      // ;

      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "green")
        .attr("d", geoPath().projection(projection) as any)
        .style("stroke", "#ffff");
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

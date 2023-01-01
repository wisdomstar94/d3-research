"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoCentroid, select, geoMercator, json, geoPath, geoAzimuthalEqualArea } from "d3";

// https://parandol.tistory.com/38

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-146-geoCentroid</title>
        <meta name="description" content="d3-146-geoCentroid 예시 코드 페이지입니다." />
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
      d3.geoCentroid 함수는 지도를 구면으로 표현했을 때의 중심점을 찾을 때 사용됩니다.
    */
    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);

    // const projection = geoMercator()
    //   .scale(1)
    //   .translate([0, 0]);
    const projection = geoAzimuthalEqualArea()
      // .scale(width / 1.5 / Math.PI)
      // .translate([width / 2, height / 2])
    ;

    // Loading the json data  
    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    json(targetUrl[2]).then((data: any) => {
      const center = geoCentroid(data);
      console.log('@center', center);

      // const path = geoPath().projection(projection);
      // const bounds = path.bounds(data);
      // const widthScale = (bounds[1][0] - bounds[0][0]) / width; 
      // const heightScale = (bounds[1][1] - bounds[0][1]) / height; 
      // const scale = 0.95 / Math.max(widthScale, heightScale);
      // const xoffset = width/2 - scale * (bounds[1][0] + bounds[0][0]) /2 + 0; 
      // const yoffset = height/2 - scale * (bounds[1][1] + bounds[0][1])/2 + 0; 
      // const offset = [xoffset, yoffset];
      // projection.scale(scale).translate(offset as any); 

      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "green")
        .attr("d", geoPath().projection(projection) as any)
        .style("stroke", "#ffff");

      svg.append("g")
        .append("text")
        .text("centroid position!")
        .attr("transform", `translate(${center[0]}, ${center[1]})`);
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
      <div>
        좀 더 연구 필요.
      </div>
    </>
  );
};

export default Index;

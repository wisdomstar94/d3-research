"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, geoOrthographicRaw, json, geoPath, geoProjection, geoAzimuthalEqualArea, geoGraticule, geoConicEquidistantRaw } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// 

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-177-geoProjection</title>
        <meta name="description" content="d3-177-geoProjection 예시 코드 페이지입니다." />
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

    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height)
    ;

    const projection = geoProjection(geoConicEquidistantRaw(0, 0))
      .scale(80)
      .rotate([0, 0])
      .center([0, 0])
      .translate([width / 2, height / 2])
    ;

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

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

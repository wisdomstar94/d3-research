import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, geoAzimuthalEqualArea, json, geoPath } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-geoazimuthalequalarea-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-141-geoAzimuthalEqualArea</title>
        <meta name="description" content="d3-141-geoAzimuthalEqualArea 예시 코드 페이지입니다." />
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
      d3.geoAzimuthalEqualArea 은 주어진 geojson 데이터에서 Lambert 방위각 등가 투영을 그리는 데 사용되는 함수입니다.
    */

    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);
    

    // AzimuthalEqualArea projection
    const gfg = geoAzimuthalEqualArea()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2]);

    // Loading the json data  
    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    json(targetUrl[2]).then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "green")
        .attr("d", geoPath().projection(gfg) as any)
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

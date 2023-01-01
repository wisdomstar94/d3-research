"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { select, json, geoPath, geoAzimuthalEqualArea, geoProjection, geoGraticule, geoTransform } from "d3";

// https://github.com/d3/d3-geo/blob/main/README.md#geoTransform
// 

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-183-geoTransform</title>
        <meta name="description" content="d3-183-geoTransform 예시 코드 페이지입니다." />
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
      d3.geoGraticule 함수는 눈금을 만들기 위한 지오메트리 생성기를 구성합니다. 
      투영 왜곡을 표시하기 위한 자오선과 평행선의 균일한 그리드입니다. 
      기본 격자는 ±80° 위도 사이의 10°마다 자오선과 평행선을 가지고 있으며, 극지방의 경우 90°마다 자오선이 있습니다.
    */

    const scale = (scaleFactor: number , width: number, height: number) => {
      return geoTransform({
        point: function(x, y) {
          this.stream.point( (x - width/2) * scaleFactor + width/2 , (y - height/2) * scaleFactor + height/2);
        },
      });
    };

    const graticule = geoGraticule();
    console.log('graticule', graticule);
    
    const lines = graticule();

    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height)
    ;

    const projection = geoAzimuthalEqualArea()
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

    svg 
      .append("g")
      .append("path")
      .datum(lines)
      .attr("class", "graticule")
      .attr("d", geoPath(projection))
      .style("fill-opacity", 0)
      .style("stroke", "#ccc")
      .style("stroke-opacity", 0.7);

    json(targetUrl[2]).then((data: any) => {
      // svg.append("g")
      //   .attr("d", geoGenerator(graticule())?.toString())
      // ;

      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "green")
        // .attr("d", geoPath().projection(projection) as any)
        .attr("d", geoPath().projection(scale(0.8, width, height)) as any)
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

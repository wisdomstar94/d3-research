"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { select, json, geoPath, geoAzimuthalEqualArea, geoGraticule, geoInterpolate } from "d3";

// https://bl.ocks.org/d3indepth/aa1f036f6a0356cb1152c4b836e93990

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-168-geoInterpolate</title>
        <meta name="description" content="d3-168-geoInterpolate 예시 코드 페이지입니다." />
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
      d3.geoInterpolate 함수는 두 점 a와 b가 지정된 인터폴레이터 함수를 반환합니다. 
      각 점은 도 단위로 2요소 배열[경도, 위도]로 지정해야 합니다.
    */

    const interpolate = geoInterpolate([0.1278, 51.5074], [-74.0059, 40.7128]);

    const width = 800;
    const height = 800;

    const canvas = select(boxElementRef.current)
      .append('canvas')
      .attr("width", width)
      .attr("height", height)
    ;

    const context = canvas.node()?.getContext('2d');
    if (context === null || context === undefined) {
      return;
    }

    const geoInterpolator = geoInterpolate([0.1278, 51.5074], [-74.0059, 40.7128]);
    // const svg = select(boxElementRef.current)
    //   .append('svg')
    //   .attr("width", width)
    //   .attr("height", height);
    
    const projection = geoAzimuthalEqualArea()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2]);

    const geoGenerator = geoPath()
      .projection(projection)
      .pointRadius(4)
      .context(context);

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    // console.log(`interpolate(50)`, interpolate(40));

    json(targetUrl[2]).then((data: any) => {
      context.clearRect(0, 0, 800, 600);
      context.lineWidth = 0.5;
      context.strokeStyle = '#333';

      context.beginPath();
      geoGenerator({type: 'FeatureCollection', features: data.features})
      context.stroke();

      // Graticule
      var graticule = geoGraticule();
      context.beginPath();
      context.strokeStyle = '#ccc';
      geoGenerator(graticule());
      context.stroke();

      context.beginPath();
      context.strokeStyle = 'red';
      geoGenerator(data);
      context.stroke();

      // Point
      context.beginPath();
      context.fillStyle = 'blue';
      geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator(1)}} as any);
      context.fill();
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

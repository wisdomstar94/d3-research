"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoCentroid, select, geoMercator, json, geoPath, geoAzimuthalEqualArea, geoOrthographic, geoGraticule, geoCircle } from "d3";

// https://bl.ocks.org/d3indepth/60f490c6abd7be53d4aa39818e11d273

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-147-geoCircle</title>
        <meta name="description" content="d3-147-geoCircle 예시 코드 페이지입니다." />
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
      d3.geoCircle 함수는 새로운 원 생성기를 반환합니다.

      d3.geoGraticule 함수는 계수선을 생성하기 위한 지오메트리 생성기를 구성합니다. 
      투영 왜곡을 표시하기 위한 균일한 자오선 및 평행선 그리드입니다. 
      기본 계수선에는 위도 ±80° 사이에서 10°마다 자오선과 평행선이 있습니다. 
      극지방의 경우 90°마다 자오선이 있습니다.
    */
    const width = 1400;
    const height = 1400;

    const context = select(boxElementRef.current)
      .append("canvas")
      .attr("width", width)
      .attr("height", height)
      .node()
      ?.getContext('2d')
    ;

    if (context === undefined) {
      return;
    }

    const projection = geoOrthographic()
      .scale(300)
      // .translate([0, 100])
      .rotate([30, -45]) // 이 함수로 지구본을 돌리듯이 보여지는 부분을 변경할 수 있음.
    ;

    const geoGenerator = geoPath()
      .projection(projection)
      .context(context);

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    json(targetUrl[2]).then((data: any) => {
      if (context === null) {
        return;
      }

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

      // Circle
      const circle = geoCircle().center([0.1278, 51.5074]).radius(5)
      context.beginPath();
      context.strokeStyle = 'red';
      geoGenerator(circle());
      context.stroke();
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

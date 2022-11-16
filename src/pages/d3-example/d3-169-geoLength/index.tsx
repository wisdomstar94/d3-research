import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, geoAzimuthalEqualArea, json, geoPath, geoLength, GeoProjection } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// 

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-169-geoLength</title>
        <meta name="description" content="d3-169-geoLength 예시 코드 페이지입니다." />
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
      d3.geoLength 함수는
      지정한 GeoJSON 개체의 대호 길이를 라디안 단위로 반환합니다. 
      다각형의 경우 외부 링의 둘레와 내부 링의 둘레를 반환합니다. 
      이것은 path.measure에 해당하는 구면입니다.
    */

    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);
    
    const projection = geoAzimuthalEqualArea()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2]);

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    json<any>(targetUrl[2]).then((data) => {
      const length = geoLength(data);
      console.log('length', length);

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

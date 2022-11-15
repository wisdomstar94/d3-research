import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoAzimuthalEquidistant, select, json, geoPath, geoProjection, geoContains, pointer, geoDistance } from "d3";

// https://github.com/d3/d3-geo#geoDistance
// https://snyk.io/advisor/npm-package/d3-geo/functions/d3-geo.geoDistance

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-158-geoDistance</title>
        <meta name="description" content="d3-158-geoDistance 예시 코드 페이지입니다." />
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
      d3.geoDistance 함수는 두 점 a와 b 사이의 대호 거리를 라디안 단위로 반환합니다. 
      각 점은 도 단위로 2-요소 배열[경도, 위도]로 지정해야 합니다. 
      이것은 두 점의 LineString이 주어진 path.measure의 구면 등가물입니다.
    */
    
    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);
    
    const projection = geoAzimuthalEquidistant()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2]);

    const state = {
      clickedLocation: null as [number, number] | null,
    };

    svg
      .on('click', function(event) {
        const pos = pointer(event);
        state.clickedLocation = projection.invert!(pos);
        console.log('pos', pos);
        // update()
      });

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    const startPos: [number, number] = [266, 439];
    const endPos: [number, number] = [382, 379];
    const distance = geoDistance(projection.invert!(startPos)!, projection.invert!(endPos)!);
    console.log('distance', distance);
    const distance2 = geoDistance(startPos, endPos);
    console.log('distance2', distance2);

    json(targetUrl[2]).then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data<GeoJSON.Feature<any>>(data.features)
        .enter().append("path")
        .attr("fill", function(d) {
          // console.log('d', d);
          // let color = '#333333';
          // const pos = pointer(event);
          // state.clickedLocation = projection.invert!(pos);
          const color = geoContains(d, projection.invert!([248, 431])!) ? '#f74cf1' : '#333';
          return color;
        })
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

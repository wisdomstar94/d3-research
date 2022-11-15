import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoAzimuthalEquidistant, select, json, geoPath, geoProjection, geoContains, pointer } from "d3";

// https://bl.ocks.org/d3indepth/c7dabcad61f8c4398130305a2035decd
// https://snyk.io/advisor/npm-package/d3-geo/functions/d3-geo.geoContains

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-157-geoContains</title>
        <meta name="description" content="d3-157-geoContains 예시 코드 페이지입니다." />
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
      d3.geoContains 함수는 지정된 GeoJSON 객체에 지정된 점이 포함된 경우에만 true를 반환하고, 객체에 점이 포함되지 않은 경우에는 false를 반환합니다. 
      점은 2요소 배열 [경도, 위도] 단위로 지정해야 합니다. 
      점 및 다중점 지오메트리의 경우 정확한 테스트가 사용되며, 구의 경우 true가 항상 반환되며, 다른 지오메트리의 경우 엡실론 임계값이 적용됩니다.
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

    json(targetUrl[2]).then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data<GeoJSON.Feature<any>>(data.features)
        .enter().append("path")
        .attr("fill", function(d) {
          console.log('d', d);
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

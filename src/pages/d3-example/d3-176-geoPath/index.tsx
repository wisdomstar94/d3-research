import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, geoOrthographicRaw, json, geoPath, geoProjection, geoAzimuthalEqualArea, geoGraticule } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// 

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-176-geoPath</title>
        <meta name="description" content="d3-176-geoPath 예시 코드 페이지입니다." />
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
      geoPath 함수는 새 지리적 경로 생성기를 만듭니다.

      기본 투영은 null 투영입니다. null 투영은 ID 변환을 나타냅니다. 
      즉, 입력 지오메트리는 투영되지 않고 원시 좌표로 직접 렌더링됩니다. 
      이것은 사전 투영된 지오메트리를 빠르게 렌더링하거나 등각 투영을 빠르게 렌더링하는 데 유용할 수 있습니다.

      기본 컨텍스트는 null이며, 이는 경로 생성기가 SVG 경로 문자열을 반환함을 의미합니다.
    */

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

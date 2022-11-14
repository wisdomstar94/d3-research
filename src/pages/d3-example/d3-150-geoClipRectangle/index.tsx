import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { geoCentroid, select, geoMercator, json, geoPath, geoAzimuthalEqualArea, geoOrthographic, geoGraticule, geoClipCircle, geoClipAntimeridian, geoClipRectangle } from "d3";

// https://stackoverflow.com/questions/71554717/d3js-map-clipping-geographic-paths-with-bounding-box
// https://bl.ocks.org/pmariac/0c18fcebeccd89196b8ad418f9c49074

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-150-geoClipRectangle</title>
        <meta name="description" content="d3-150-geoClipRectangle 예시 코드 페이지입니다." />
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
      d3.geoClipRectangle 함수는 지오메트리가 좌표의 직사각형으로 경계를 이루도록 스트림을 변환하는 클리핑 함수를 생성합니다. 
      [x0, y0], [x1, y1] 일반적으로 후 클리핑에 사용됩니다.
    */
    
    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);

    const clip = Math.PI;

    // AzimuthalEqualArea projection
    const projection = geoMercator()
      .scale(width / 1.5 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0)
      .postclip(function(stream){ // 후 클립
        // stream = geoClipAntimeridian(stream); // cut antimeridian
        return geoClipRectangle(250, 50, 700, 500)(stream);
      })
    ;

    const geoGenerator = geoPath()
      .projection(projection);

    // Loading the json data  
    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    const graticule = geoGraticule();

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

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";
import { json, geoBounds, select, geoAzimuthalEquidistant, geoPath } from "d3";

// https://github.com/d3/d3-geo#geoBounds
// https://javascript.hotexamples.com/examples/d3-geo/-/geoBounds/javascript-geobounds-function-examples.html
// https://bl.ocks.org/BastiTee/23e05990a761b4d616ae42d0ed036307

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-145-geoBounds</title>
        <meta name="description" content="d3-145-geoBounds 예시 코드 페이지입니다." />
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
      지정한 GeoJSON 개체에 대한 구형 경계 상자를 반환합니다. 
      경계 상자는 2차원 배열([왼쪽, 아래쪽, 오른쪽, 위쪽])로 표시됩니다. 
      여기서 왼쪽은 최소 경도, 아래쪽은 최소 위도, 오른쪽은 최대 경도, 위쪽은 최대 위도입니다. 
      모든 좌표는 도 단위로 주어집니다. 
      (투영된 평면 좌표에서 최소 위도는 일반적으로 최대 y 값이고 최대 위도는 일반적으로 최소 y 값입니다.) 
      이는 path.bounds의 구면 등가입니다. 
    */

    const width = 800;
    const height = 800;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", width)
      .attr("height", height);

    const targetUrl = [
      '/geo/skorea-municipalities-2018-geo.json',
      '/geo/gz_2010_us_050_00_5m.json',
      '/geo/countries.geojson.json', // https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
    ];

    json(targetUrl[2]).then((data: any) => {
      const bounds = geoBounds(data);
      console.log('bounds', bounds);

      const bottomLeft = bounds[0];
      const topRight = bounds[1];
      const rotLong = -(topRight[0] + bottomLeft[0]) / 2;
      const center = [
        ((topRight[0] + bottomLeft[0]) / 2) + rotLong, 
        (topRight[1] + bottomLeft[1]) / 2,
      ];
      // console.log('bottomLeft', bottomLeft);
      // console.log('topRight', topRight);
      // console.log('rotLong', rotLong);
      // console.log('center', center);

      let projection = geoAzimuthalEquidistant()
        // .parallels([bottomLeft[1], topRight[1]])
        .translate([width / 2, height / 2])
        .rotate([rotLong, 0, 0])
        .center(center as any)
        .scale(width / 1.5 / Math.PI)
        .translate([width / 2, height / 2]);

      // const bottomLeftPx = projection(bottomLeft);
      // const topRightPx = projection(topRight);
      // if (bottomLeftPx !== null && topRightPx !== null) {
      //   const scaleFactor = 1.00 * Math.min(
      //     width / (topRightPx[0] - bottomLeftPx[0]), 
      //     height / (-topRightPx[1] + bottomLeftPx[1]),
      //   );
      //   projection = geoAzimuthalEquidistant()
      //     // .parallels([bottomLeft[1], topRight[1]])
      //     .rotate([rotLong, 0, 0])
      //     .translate([width / 2, height / 2])
      //     .scale(scaleFactor * 0.975 * 1000)
      //     .center(center as any);
      // }

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

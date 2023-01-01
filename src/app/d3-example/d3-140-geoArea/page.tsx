"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { geoInterpolate, geoArea, json, select, geoPath, geoMercator, GeoGeometryObjects, geoEqualEarth, geoGraticule10 } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://github.com/southkorea
// https://github.com/d3/d3-geo#geoArea
// https://www.lucypark.kr/blog/2015/06/24/seoul-matzip-mapping/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-140-geoArea</title>
        <meta name="description" content="d3-140-geoArea 예시 코드 페이지입니다." />
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

    const dimensions = {
      width: 800,
      height: 600,
      margin: {
        top: 50,
        right: 15,
        bottom: 50,
        left: 50,
      },
      boundsWidth: 0,
      boundsHeight: 0,
    };
    dimensions.boundsWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundsHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    /*
      d3.geoArea 는 지정된 GeoJSON 객체의 구형 영역을 스테라디안(입체각의 국제 단위) 단위로 반환합니다. 
      이것은 path.area에 해당하는 구형입니다.

      *** geoArea 가 사용되는 예시를 발견하지 못했음!!!
      *** 아래 코드들은 그로 인해 직접 해보다가 생긴 부산물들 입니다.
    */

    // const londonLonLat = [0.1278, 51.5074];
    // const newYorkLonLat = [-74.0059, 40.7128];
    // const geoInterpolator = geoInterpolate(londonLonLat as any, newYorkLonLat as any);
    // console.log('geoInterpolator(0)', geoInterpolator(0));
    // console.log('geoInterpolator(1)', geoInterpolator(1));
    // console.log('geoInterpolator(2)', geoInterpolator(2));

    const width = 400;
    const height = 400;

    const svg = select(boxElementRef.current).append('svg').attr("width", width).attr("height", height);

    const projection = geoMercator()
      .center([126.9895, 37.5651])
      .scale(5000)
      .translate([width / 2, height / 2]);

    // https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-municipalities-2018-geo.json
    json('/geo/skorea-municipalities-2018-geo.json').then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        // .attr("fill", "black")
        .attr("d", geoPath().projection(projection) as any)
        .style("stroke", "#fff")
      ;

      {
        const svg = select(boxElementRef.current).append('svg').attr("width", width).attr("height", height);
        const sphere: GeoGeometryObjects = { type: 'Sphere' };
        const geoarea = geoArea(sphere);
        console.log('geoarea', geoarea);
        const projection = geoEqualEarth().fitWidth(dimensions.boundsWidth, sphere);
        const pathGenerator = geoPath(projection);
        console.log(`pathGenerator(sphere)`, pathGenerator(sphere));
        const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere);

        const wrapper = select(boxElementRef.current)
          .append('svg')
          .attr('viewBox', `0,0,${dimensions.width},${dimensions.height}`)
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('preserveAspectRatio', 'xMinYMin');
        const bounds = wrapper
          .append('g')
          .attr('class', 'bounds')
          .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);
        // const metricValues = Object.values(metricDataByCountry);
        // const metricValueExtent = d3.extent(metricValues) as number[];
        // const maxChange = d3.max([-metricValueExtent[0], metricValueExtent[1]]);
        // const colorScale = d3.scaleLinear().domain([-maxChange, 0, maxChange]).range(['indigo', 'white', 'darkgreen']);

        const earth = bounds.append('path').attr('class', 'earth').attr('d', pathGenerator(sphere));
        const graticuleJson = geoGraticule10(); 
        const graticule = bounds.append('path').attr('class', 'graticule').attr('d', pathGenerator(graticuleJson));

        const countries = bounds
          .selectAll('.country')
          .data(data.features) 
          .enter()
          .append('path')
          .attr('class', 'country') 
          .attr('d', (d: any) => pathGenerator(d)) 
        ;
          // .attr('fill', (d) => {
          //   const metricValue = metricDataByCountry[countryIdAccessor(d)]
          //   if (typeof metricValue == 'undefined') return '#e2e6e9'
          //   return colorScale(metricValue)
          // })

        // svg.append("g")
        //   .selectAll("path")
        //   .data(data.features)
        //   .enter().append("path")
        //   // .attr("fill", "black")
        //   .attr("d", geoPath().projection(projection) as any)
        //   .style("stroke", "#fff")
        // ;
      }
    });

    // {
    //   const svg = select(boxElementRef.current).append('svg').attr("width", width).attr("height", height);
    //   const sphere: GeoGeometryObjects = { type: 'Sphere' };
    //   geoArea(sphere);
    //   const projection = geoEqualEarth().fitWidth(500, sphere);
    //   const pathGenerator = geoPath(projection);
    //   console.log(`pathGenerator(sphere)`, pathGenerator(sphere));

    //   svg.append("g")
    //     .selectAll("path")
    //     .data(data.features)
    //     .enter().append("path")
    //     // .attr("fill", "black")
    //     .attr("d", geoPath().projection(projection) as any)
    //     .style("stroke", "#fff")
    //   ;
    // }
      
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
      <div>
        geoArea 가 사용되는 예시를 발견하지 못했음!!!
      </div>
    </>
  );
};

export default Index;

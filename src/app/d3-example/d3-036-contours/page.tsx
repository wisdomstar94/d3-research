"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, scaleLinear, contours, color, geoPath } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@d3/contours
// https://github.com/d3/d3-contour
// https://runebook.dev/ko/docs/d3/d3-contour

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-036-contours</title>
        <meta name="description" content="d3-036-contours 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    const width = 256;
    const height = 256;

    const n = 256, m = 256, values: number[] = new Array(n * m);
    for (let j = 0.5, k = 0; j < m; ++j) {
      for (let i = 0.5; i < n; ++i, ++k) {
        values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
      }
    }

    console.log('values', values);

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    console.log('maxValue', maxValue);
    console.log('minValue', minValue);

    const scaleLinears = scaleLinear()
      .domain([minValue, maxValue])
      .range([0, 10])
    ;

    function goldsteinPrice(x: number, y: number) {
      return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
          * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
    }

    const contour = contours()
      .size([n, m])
      .thresholds(Array.from({ length: 19 }, (_, i) => Math.pow(2, i + 2)))
      (values);
    
    console.log('contour', contour);

    const svg = select(boxElementRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
      .style("margin", "0 -14px")
    ;

    svg.append("g")
      .attr("stroke", "#333")
      .attr("stroke-opacity", 0.5)
      .selectAll("path")
      .data(contour)
      .join("path") // 데이터에 변동이 생겼을 때 기존에는 enter, update, exit 메서드를 일일이 사용해야 했지만, join 이라는 함수가 새로 생겼다고 함.
      .attr("fill", (d: any) => {
        const colors = color('#ffd4a1')?.darker(scaleLinears(d.value)).formatHex();
        return colors + '';
      })
      .attr("d", geoPath())
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

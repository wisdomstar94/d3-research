"use client"
import { arc, pie, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-300-pie</title>
        <meta name="description" content="d3-300-pie 예시 코드 페이지입니다." />
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
      d3.pie 함수는 기본 설정으로 새 파이 생성기를 구성합니다.
    */

    const data = [1, 1, 2, 3, 5, 8, 13, 21];
    const arcs = pie()(data);
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    svg.append('g')
      .attr("transform", "translate(150, 150)")
      .selectAll()
      .data(arcs)
      .enter()
      .append('path')
      // .classed('node', true)
      .attr('d', (d: any) => { 
        console.log('d', d);
        // return arc()(d);
        // /*
        //   data,
        //   endAngle,
        //   index,
        //   padAngle,
        //   startAngle,
        //   value,
        // */
        return arc()({
          innerRadius: 20,
          outerRadius: 40,
          startAngle: d.startAngle, // 호의 시작 각도, 12시 방향에서 0
          endAngle: d.endAngle, // 호의 끝 각도, 12시 방향에서 0
        }); 
      })
      .attr("stroke", "#333")
      .attr("fill", "none")
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

"use client"
import { arc, pie, pointRadial, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-302-pointRadial</title>
        <meta name="description" content="d3-302-pointRadial 예시 코드 페이지입니다." />
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
      d3.pointRadial 함수는 지정된 각도에 대한 점 [x, y]를 라디안 단위로 반환합니다. 
      -y(12시)에서 시계 방향으로 진행되는 양의 각도와 지정된 반지름을 사용합니다.
    */
    const point = pointRadial(12, 30);
    console.log('point', point);




    const data = [13, 21];
    const _pie = pie();
    const arcs = _pie(data);
    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");

    svg.append('g')
      .append('circle')
      .attr('cx', data[0])
      .attr('cy', data[1])
      .attr('r', '5')
      .attr('fill', '#00f')
    ;
      
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
        const point = pointRadial((d.endAngle - d.startAngle), 20);
        svg
          .append("g")
          .attr("transform", "translate(150, 150)")
          .append("circle")
          .attr("cx", point[0])
          .attr("cy", point[1])
          .attr("r", 2)
          .attr("fill", "#f00")
        ;

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

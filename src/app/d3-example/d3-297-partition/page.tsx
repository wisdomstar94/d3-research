"use client"
import { hierarchy, partition, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-297-partition</title>
        <meta name="description" content="d3-297-partition 예시 코드 페이지입니다." />
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
      d3.partition 함수는 기본 설정으로 새 파티션 레이아웃을 만듭니다.
    */
    const data = {
      children: [
        {
          children: [
            {stat: 1},
            {stat: 1},
            {stat: 1},
          ],
        },
        {
          children: [
            {stat: 1},
            {stat: 1},
            {stat: 2},
            {stat: 3},
          ],
        },
        {
          children: [
            {stat: 1},
            {stat: 1},
            {stat: 1},
            {stat: 1},
            {stat: 2},
            {stat: 2},
            {stat: 2},
            {stat: 4},
            {stat: 4},
            {stat: 8},
          ],
        },
      ],
      stat: 0,
    };

    const root = hierarchy(data)
      .sum(d => d.hasOwnProperty("stat") ? d.stat : 0)
        .sort((a,b) => (b.value ?? 0) - (a.value ?? 0));

    const myPartition = partition().size([250, 250]);
    myPartition(root);

    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");
    svg.append('g')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('rect')
      .classed('node', true)
      .attr('x', (d: any) => { 
        return d.x0; 
      })
      .attr('y', (d: any) => { 
        return d.y0; 
      })
      .attr('width', (d: any) => { 
        return d.x1 - d.x0; 
      })
      .attr('height', (d: any) => { 
        return d.y1 - d.y0; 
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

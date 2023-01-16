"use client"
import { hierarchy, select, treemap, treemapSliceDice } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-471-treemapSliceDiceDice</title>
        <meta name="description" content="d3-471-treemapSliceDiceDice 예시 코드 페이지입니다." />
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
      d3.treemapSliceDice 함수는 지정한 노드의 깊이가 홀수이면 treemapSlice로, 
      그렇지 않으면 treemapDice로 이동합니다.
    */
  
    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
    ;

    const data = {
      name: "diet",
      children:
        [
          {
            name: "aaa",
            children: [
                {
                name: "pesonA",
                ground: "100",
                building: "200",
                cash: "300",
                total: "600"
                },
                {
                name: "pesonB",
                ground: "10",
                building: "20",
                cash: "300",
                total: "330"
                }
              ]
            },
          {
          name: "bbb",
          children: [
            {
              name: "pesonC",
              ground: "200",
              building: "10",
              cash: "100",
              total: "310"
            },
            {
              name: "pesonD",
              ground: "50",
              building: "30",
              cash: "10",
              total: "90"
            }
          ]
        }
      ]
    };
    const treeLayout = treemap().size([400, 400]);
    const root = hierarchy(data);  // (*)
    const links = treeLayout(root).links();  // (*)
    treemapSliceDice(links[0].source, 0, 0, 400, 400);
    // const linkPathGenerator = linkHorizontal()  // (*)
    //   .x((d: any) => isNaN(d.x0) ? 0 : d.x0)
    //   .y((d: any) => isNaN(d.y0) ? 0 : d.y0)
    // ;
    console.log(`links`, links);
  
    // 좀 더 연구 필요..

    // svg
    //   .selectAll('path')
    //   .data(links)
    //   .enter()
    //   .append('rect')
    //   .attr('d', d => {
    //     console.log(`d`, d);
    //     return '';
    //   })
    //   .attr('fill', 'none')
    //   .attr('stroke', '#333')
    // ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

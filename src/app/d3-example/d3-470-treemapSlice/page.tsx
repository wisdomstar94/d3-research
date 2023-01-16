"use client"
import { hierarchy, select, treemap, treemapSlice } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-470-treemapSlice</title>
        <meta name="description" content="d3-470-treemapSlice 예시 코드 페이지입니다." />
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
      d3.treemapSlice 함수는 x0, y0, x1, y1로 지정된 직사각형 영역을 지정된 
      각 노드의 자식 값에 따라 수직으로 나눕니다. 
      지정된 사각형의 맨 위 가장자리(y0)부터 순서대로 자식이 배치됩니다. 
      하위 값의 합이 지정된 노드의 값보다 작으면(즉, 지정된 노드의 내부 값이 0이 아닌 경우) 
      나머지 빈 공간은 지정된 사각형의 아래쪽 가장자리(y1)에 위치합니다.
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
    treemapSlice(links[0].source, 0, 0, 400, 400);
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

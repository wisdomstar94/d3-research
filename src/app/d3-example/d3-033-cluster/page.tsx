"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, cluster, hierarchy } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://observablehq.com/@jonghunpark/d3-hierarchy
// https://observablehq.com/@d3/cluster
// https://d3-wiki.readthedocs.io/zh_CN/master/Cluster-Layout/
// https://gist.github.com/stereocat/8e5c9927a11441f71228471d5340b406
// https://www.w3.org/TR/SVG/text.html

export declare namespace ID3Custer {
  export interface Data {
    name: string;
    children: Data[];
  }

  export interface Point {
    x: number;
    y: number;
  }
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-033-cluster</title>
        <meta name="description" content="d3-033-cluster 예시 코드 페이지입니다." />
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

    const data: ID3Custer.Data = {
      name: 'root', 
      children: [
        {
          name: '1',
          children: [
            {
              name: '1-1',
              children: [],
            },
          ],
        },
        {
          name: '2',
          children: [
            {
              name: '2-1',
              children: [],
            },
            {
              name: '2-2',
              children: [
                {
                  name: '2-2-1',
                  children: [],
                },
                {
                  name: '2-2-2',
                  children: [
                    {
                      name: '2-2-2-1',
                      children: [
                        
                      ],
                    },
                    {
                      name: '2-2-2-2',
                      children: [
                        
                      ],
                    },
                    {
                      name: '2-2-2-3',
                      children: [
                        
                      ],
                    },
                    {
                      name: '2-2-2-4',
                      children: [
                        
                      ],
                    },
                    {
                      name: '2-2-2-5',
                      children: [
                        
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: '2-2-3',
              children: [],
            },
          ],
        },
        {
          name: '3',
          children: [
            {
              name: '3-1',
              children: [],
            },
          ],
        },
      ],
    };
  
    const width = 800;
    const height = 400;
  
    const clusters = cluster().size([width - 100, height - 100]) // cluster 를 계산할 영역을 지정.
    ;
    const rootNode = hierarchy<ID3Custer.Data>(data); // 계층 구조의 데이터를 HierarchyNode 객체로 반환해주는 d3.hierarchy 을 사용하여 rootNode 에 저장.
    const nodes = clusters(rootNode);
  
    // svg 의 크기를 지정.
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    ;
  
    const g = svg.append('g').attr("transform", "translate(20,20)");
  
    // Nodes (circle)
    g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle.node')
      .data(rootNode.descendants()) // 계층 구조의 데이터의 HierarchyNode 객체에서 각 데이터에 해당하는 자식 노드들의 데이터를 반환.
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', function(d: any) {return d.x;}) // 자식 노드에 해당하는 x 좌표 반환. (rootNode.descendants() 에서 자동으로 계산해준 x 좌표 값임.)
      .attr('cy', function(d: any) {return d.y;}) // 자식 노드에 해당하는 y 좌표 반환. (rootNode.descendants() 에서 자동으로 계산해준 y 좌표 값임.)
      .attr('r', 4)
    ;
  
    // Text
    g.append('g')
      .attr('class', 'texts')
      .selectAll('text.text')
      .data(rootNode.descendants())
      .enter()
      .append('text')
      .classed('text', true)
      .attr('x', function (d: any) { return d.x; })
      .attr('y', function (d: any) { return d.y + 15; })
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      // .attr('width', 10)
      .text(function (d: any) { return d.data.name })
    ;
  
    // Links (line)
    g.append('g')
      .attr('class', 'links')
      .selectAll('line.link')
      .data(rootNode.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', function(d: any) {return d.source.x;})
      .attr('y1', function(d: any) {return d.source.y;})
      .attr('x2', function(d: any) {return d.target.x;})
      .attr('y2', function(d: any) {return d.target.y;})
      .attr('stroke', 'black')
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

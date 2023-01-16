"use client"
import { hierarchy, linkHorizontal, select, tree } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://velog.io/@suyeonme/JS-D3.js%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-Tree-Visualization-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-465-tree</title>
        <meta name="description" content="d3-465-tree 예시 코드 페이지입니다." />
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
      d3.tree 함수는 기본 설정으로 새 트리 레이아웃을 만듭니다.
    */

    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
    ;

    const data = {
      name: "rootNode",
      children: [
        {
          name: "child1",
        },
        {
          name: "child2",
          children: [
            { name: "grandChild1" },
            { name: "grandChild2" },
            { name: "grandChild3" },
            { name: "grandChild4" },
          ],
        },
        {
          name: "child3",
          children: [
            { name: "grandChild5" },
            { name: "grandChild6" },
          ],
        },
      ],
    };
    const treeLayout = tree().size([400, 400]);
    const root = hierarchy(data);  // (*)
    const links = treeLayout(root).links();  // (*)
    const linkPathGenerator = linkHorizontal()  // (*)
      .x((d: any) => d.x)
      .y((d: any) => d.y)
    ;
    console.log(`links`, links);
  
    svg
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', d => linkPathGenerator(d as any))
      .attr('fill', 'none')
      .attr('stroke', '#333')
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

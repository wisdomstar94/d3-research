"use client"
import { quadtree, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-313-quadtree</title>
        <meta name="description" content="d3-313-quadtree 예시 코드 페이지입니다." />
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
      d3.quadtree 함수는 익스텐트가 비어 있고 기본 x 및 y 액세스자가 있는 비어 있는 새 쿼드 트리를 만듭니다. 
      데이터를 지정하면 지정된 데이터 테이블을 쿼드 트리에 추가합니다.
    */
    
    const data: Array<[number, number]> = [
      [10, 10],
      [30, 10],
      [50, 10],
      [15, 30],
      [35, 30],
      [55, 30],
    ];

    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
    ;

    svg
    .append('g')
    .selectAll()
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .attr('r', 2)
    .attr('fill', '#333')
    ;

    const tree = quadtree(data);
    console.log(`tree`, tree);

    console.log(`tree.root()`, tree.root());

    // 이 함수는 "쿼드트리" 알고리즘에 대한 이해가 선행되어야 할 듯 싶다!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { curveBumpY, linkHorizontal, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-linkhorizontal-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-275-linkHorizontal</title>
        <meta name="description" content="d3-275-linkHorizontal 예시 코드 페이지입니다." />
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
      d3.linkHorizontal 함수는 수평 접선 이 있는 새 링크 생성기를 반환합니다. 
      일반적으로 루트가 위쪽/아래쪽 가장자리에 있고 하위 항목이 아래로/위로 이동하는 경우에 사용됩니다.
    */
    const linkGenerator = linkHorizontal()
      .x(d => d[0])
      .y(d => d[1])
    ;

    // console.log('links', links);
    const d = linkGenerator({
      source: [100, 100],
      target: [300, 300],
    });
    console.log('d', d);

    const svg = select(boxElementRef.current).append('svg').attr("width", "100%").attr("height", "100%");    
    svg
      .append("g")
      .attr("transform", "translate(50 50)")
      .append("path")
      .attr("d", d)
      .attr("fill", "none")
      .attr("stroke", "green")
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

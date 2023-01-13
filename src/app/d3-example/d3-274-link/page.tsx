"use client"
import { curveBumpY, link, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-lineradial-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-274-link</title>
        <meta name="description" content="d3-274-link 예시 코드 페이지입니다." />
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
      d3.link 함수는 지정한 곡선을 사용하여 새 링크 생성기를 반환합니다. 
      예를 들어 디스플레이 상단 모서리에 루트를 둔 트리 다이어그램의 링크를 시각화하려면
      기본 설정을 사용하는 경우 링크 생성기는 DefaultLinkObject 인터페이스를 준수하는 링크 개체를 허용합니다.
    */
    const linkGenerator = link(curveBumpY)
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

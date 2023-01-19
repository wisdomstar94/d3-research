"use client"
import { select, window } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-518-window</title>
        <meta name="description" content="d3-518-window 예시 코드 페이지입니다." />
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
      d3.window 함수는 지정한 노드의 소유자 창을 반환합니다. 
      노드가 노드인 경우 소유자 문서의 기본 보기를 반환하고, 노드가 문서인 경우 기본 보기를 반환하며, 
      그렇지 않은 경우 노드를 반환합니다.
    */
    
    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr("width", "100%")
      .attr("height", "100%")
    ;

    const target = window(svg.node()!);
    console.log(`target`, target);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { linkRadial, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-linkradial-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-276-linkRadial</title>
        <meta name="description" content="d3-276-linkRadial 예시 코드 페이지입니다." />
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
      d3.linkRadial 함수는 방사형 탄젠트가 있는 새 링크 생성기를 반환합니다. 
      일반적으로 루트에서 바깥쪽으로 퍼지는 자식과 함께 루트가 중앙에 있을 때 사용됩니다.
    */
    const linkGenerator = linkRadial()
      .angle(d => d[0])
      .radius(d => d[1])
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
      .attr("transform", "translate(350 250)")
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

"use client"
import { easeBack, select, transition } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-463-transition</title>
        <meta name="description" content="d3-463-transition 예시 코드 페이지입니다." />
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
      d3.transition 함수는 루트 요소인 document.documentElement에서 지정한 이름의 새 전환을 반환합니다. 
      이름을 지정하지 않으면 null이 사용됩니다. 
      새 전환은 동일한 이름의 다른 전환에만 적용됩니다. 
      이름은 전환 인스턴스일 수도 있습니다. selection.transition을 참조하십시오.
    */

    // 트랜지션을 이렇게 별도로 생성해 놓고 필요한 곳에 갖다 쓸 수 있음!
    const t = 
      transition()
      .ease(easeBack)
      .duration(1000)
    ;

    const svg = 
      select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
    ;
    
    const circle = svg
      .append('g')
      .append('circle')
      .attr('r', 10)
      .attr('cx', 20)
      .attr('cy', 20)
      .attr('style', 'fill: #f00')
      .transition(t)
      .attr('cx', 100)
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

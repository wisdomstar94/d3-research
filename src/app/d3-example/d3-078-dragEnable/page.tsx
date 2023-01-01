"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { dragDisable, dragEnable, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://github.com/d3/d3-drag#drag

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-078-dragEnable</title>
        <meta name="description" content="d3-078-dragEnable 예시 코드 페이지입니다." />
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
      d3.dragEnable 은 지정된 창에서 기본 끌어서 놓기와 텍스트 선택을 허용합니다. 
      d3.dragDisable의 효과를 취소합니다. 이 메서드는 마우스 업에서 호출되고 마우스 다운에서 d3.dragDisable 이 앞에 나옵니다.
    */

    dragDisable(window);

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300");

    const rect1 = svg.append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('style', 'fill: rgba(255, 0, 0)')
      .on('click', function(e) {
        dragEnable(window);
      })
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
      텍스트 드래그가 안될 겁니다. (그러나 위에 빨간 사각형을 클릭하고 나면 드래그가 됩니다.)
    </>
  );
};

export default Index;

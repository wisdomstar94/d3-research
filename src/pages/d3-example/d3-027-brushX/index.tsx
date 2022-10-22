import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, brushX, D3BrushEvent } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-027-brushX</title>
        <meta name="description" content="d3-027-brushX 예시 코드 페이지입니다." />
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

    /*
      d3.brushX 는 주로 call 함수의 인자로 넘겨지면서 사용되며,
      마우스로 드래그 할 시 특정 영역이 x축 으로만
      생성되고 해당 영역을 크기조정 및 이동할 수 있게 해주는 
      기능을 제공함.

      d3.brushX().extend() : 브러쉬 할 수 있는 영역을 제한함.
      d3.brushX().on("brush") : 브러쉬 될 때 마다 호출되는 콜백함수.
    */

    select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
      .append("g")
      .attr("class", "brush")
      .call(brushX().on("brush", (e: D3BrushEvent<any>) => {
        console.log('e', e);
      }));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

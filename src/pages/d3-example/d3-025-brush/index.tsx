import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { brush, select, D3BrushEvent } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-025-brush</title>
        <meta name="description" content="d3-025-brush 예시 코드 페이지입니다." />
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
      d3.brush 는 주로 call 함수의 인자로 넘겨지면서 사용되며,
      마우스로 드래그 할 시 특정 영역이
      생성되고 해당 영역을 크기조정 및 이동할 수 있게 해주는 
      기능을 제공함.

      d3.brush().extend() : 브러쉬 할 수 있는 영역을 제한함.
      d3.brush().on("brush") : 브러쉬 될 때 마다 호출되는 콜백함수.
      d3.move : 브러쉬 영역을 특정 영역으로 이동시킴.
    */

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
      .attr("style", "border: 1px solid #ccc")
    ;

    const g = svg.append('g').attr("class", "brush");

    const brushes = brush()
      .on("start brush", ({selection}) => brushed(selection))
      .on("end", brushended)
      .extent([[50, 50], [200, 200]])
    ;

    function brushed(selection: SVGGElement) {
      console.log('brushed.selection', selection);
    };

    function brushended(brushEvent: D3BrushEvent<any>) {
      const {
        selection,
        sourceEvent,
      } = brushEvent;
      console.log('selection', selection);
      console.log('sourceEvent', sourceEvent);
      if (!brushEvent.sourceEvent) return;
      select(document.querySelector('.brush') as SVGGElement).transition()
        .delay(100)
        .duration(brushEvent.selection ? 750 : 0)
        .call(brushes.move, [[60, 60], [70, 70]]);
    };

    g.call(brushes);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
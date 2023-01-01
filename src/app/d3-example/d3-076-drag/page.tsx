"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, drag } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://github.com/d3/d3-drag#drag

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-076-drag</title>
        <meta name="description" content="d3-076-drag 예시 코드 페이지입니다." />
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
      d3.drag 는 
    */
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", "height")
      .attr("height", "height");

    const drags = drag<SVGRectElement, unknown, unknown>()
      .on('start', function(d) {
        const event: MouseEvent = d.sourceEvent;
        console.log('start', d);
        select(this).raise().classed("active", true);
      })
      .on('drag', function(d) {
        const event: MouseEvent = d.sourceEvent;
        const subject = d.subject; // drag 가 시작된 좌표정보가 담긴 객체
        let x = Number(select(this).attr('lx'));
        if (isNaN(x)) {
          x = 0;
        }
        let y = Number(select(this).attr('ly'));
        if (isNaN(y)) {
          y = 0;
        }

        const xAddedValue = d.x - subject.x;
        const yAddedValue = d.y - subject.y;

        console.log('drag', d);
        select(this).attr("x", x + xAddedValue).attr("y", y + yAddedValue);
      })
      .on('end', function(d) {
        const event: MouseEvent = d.sourceEvent;
        console.log('end');
        select(this).attr('lx', select(this).attr('x')).attr('ly', select(this).attr('y'));
      })
    ;

    const rect1 = svg.append('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('style', 'fill: rgba(255, 0, 0)')
      .call(drags)
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

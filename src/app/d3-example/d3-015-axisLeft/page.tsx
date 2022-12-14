"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, scaleLinear, axisLeft } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-015-axisLeft</title>
        <meta name="description" content="d3-015-axisLeft 예시 코드 페이지입니다." />
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
      d3.axisLeft 은 d3.AxisScale 타입의 데이터를 인자로 받아
      왼쪽 y 축의 데이터 수치를 그릴 때 사용하는 함수.

      d3.axisLeft 은 selection(context) 를 인자로 받는 함수를 반환함.
    */

    const width = 300;
    const height = 300;

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    ;

    // d3.scaleLinear 은 d3-010-area 에서 한번 알아본 적이 있음.
    const yAxisScale = scaleLinear()
      .domain([0, 100])
      .range([0, height - 100])
    ;

    const yAxis = axisLeft(yAxisScale);

    svg.append('g')
      .attr('transform', 'translate(30, 10)')
      .call(yAxis) // call 은 선택자가 여러개 선택되었더라도 인자로 받은 함수에 selection(context)를 넘기면서 단 한번만 호출함.
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
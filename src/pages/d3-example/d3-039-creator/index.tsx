import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { creator, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-creator-function/
// https://github.com/d3/d3-selection/blob/v1.4.0/README.md#creator
// http://using-d3js.com/01_04_create_delete_move_elements.html

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-039-creator</title>
        <meta name="description" content="d3-039-creator 예시 코드 페이지입니다." />
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
      d3.create 는 d3 관련 메소드 체이닝을 사용할 수 있지만,
      d3.creator 는 d3 관련 메소드 체이닝을 사용할 수 없다.


    */
    const textCreator = creator('text'); // namespace 를 지정해 주어야 append 가 가능함.

    select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
      .append('g')
      .append(textCreator)
      .attr('x', 50)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#000')
      .text('안녕하십니까!?');
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { create, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://stackoverflow.com/questions/49999268/creating-and-appending-detached-elements-with-d3-create

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-038-create</title>
        <meta name="description" content="d3-038-create 예시 코드 페이지입니다." />
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

    const text = create('svg:text') // namespace 를 지정해 주어야 append 가 가능함.
      .attr('x', 50)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#000')
      .text('안녕하세요')
    ;

    select(boxElementRef.current)
      .append('svg')
      .append('g')
      .append(() => text.node());
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

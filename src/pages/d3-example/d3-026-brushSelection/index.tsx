import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, brush, brushSelection } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-026-brushSelection</title>
        <meta name="description" content="d3-026-brushSelection 예시 코드 페이지입니다." />
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
      d3.brushSelection 함수는 
      현재 brush 로 그려진 영역에 대한 좌표 정보를
      반환하는 함수임.
    */

    select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
      .append("g")
      .attr("class", "brush")
      .call(brush().on("brush", function(e) {
        // console.log(`on("brush").e`, e);
        const selection = brushSelection(this);
        console.log(`on("brush").selection`, selection);
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
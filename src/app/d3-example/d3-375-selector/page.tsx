"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-375-selector</title>
        <meta name="description" content="d3-375-selector 예시 코드 페이지입니다." />
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
      d3.selector 실행 시 인수로 전달된 선택기와 일치하는 첫 번째 하위 항목을 반환하는 함수를 반환합니다.
    */

    // this.querySelector 이렇게 this 에서 요소를 찾는데.. 어디서 어떻게 활용되는지는 좀 더 연구 필요..

    // const mySelector = selector('g');

    // const svg = 
    //   select(boxElementRef.current)
    //   .append('svg')
    //   .attr('width', '100%')
    //   .attr('height', '100%')
    // ;

    // svg.append('g');

    // svg
    // .on('click', function(e) {
    //   console.log(`mySelector`, mySelector);  
    // })

  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

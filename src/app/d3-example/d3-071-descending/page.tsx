"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { descending } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-descending-function/
// https://github.com/d3/d3-array#descending

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-071-descending</title>
        <meta name="description" content="d3-071-descending 예시 코드 페이지입니다." />
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
      d3.descending(a, b) 는 a가 b보다 크면 -1을 반환하고, a가 b보다 작으면 1을 반환하고, 0을 반환합니다. 
      이것은 자연 역순을 위한 비교 함수이며, 내장된 배열 정렬 방법과 함께 요소를 내림차순으로 배열하는 데 사용될 수 있습니다.

      function descending(a, b) {
        return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }
    */

    const arr = [3, 2, 5, 4, 1];
    console.log('arr', arr);
    
    const arrSort = [...arr].sort(descending);
    console.log('arrSort', arrSort);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

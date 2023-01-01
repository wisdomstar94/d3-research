"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { fcumsum } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-array#fcumsum
// https://runebook.dev/ko/docs/d3/d3-array

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-120-fcumsum</title>
        <meta name="description" content="d3-120-fcumsum 예시 코드 페이지입니다." />
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
      d3.fcumsum 는 지정된 값의 전체 정밀도 누적 합계를 반환합니다.
    */
    const arr = [1, 2.5, 7.3, 10];
    console.log(`arr`, arr);

    const fcumsums = fcumsum(arr);
    console.log(`fcumsums`, fcumsums);
    /*
      0: 1     ==> arr[0]
      1: 3.5   ==> arr[0] + arr[1]
      2: 10.8  ==> arr[0] + arr[1] + arr[2]
      3: 20.8  ==> arr[0] + arr[1] + arr[2] + arr[3]
    */
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

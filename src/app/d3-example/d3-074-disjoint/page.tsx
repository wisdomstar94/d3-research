"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { disjoint } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-074-disjoint</title>
        <meta name="description" content="d3-074-disjoint 예시 코드 페이지입니다." />
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
      d3.disjoint 는 두 개의 배열에서 서로 겹치는 요소가 없으면 true, 있으면 false 를 반환하는 함수입니다.
    */
    const arr1 = [1, 3, 4];
    const arr2 = [100, 200];

    console.log(`arr1`, arr1);
    console.log(`arr2`, arr2);

    const result = disjoint(arr1, arr2);
    console.log(`result`, result);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

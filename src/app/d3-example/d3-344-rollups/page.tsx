"use client"
import { rollups } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-344-rollups</title>
        <meta name="description" content="d3-344-rollups 예시 코드 페이지입니다." />
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
      d3.rollups 함수는 d3.rollup과 동일하지만 중첩된 맵 대신 중첩된 배열을 반환합니다.
    */
    const data = [
      { name: "jim",   amount: "34.0",   date: "11/12/2015" },
      { name: "carl",  amount: "120.11", date: "11/12/2015" },
      { name: "stacy", amount: "12.01",  date: "01/04/2016" },
      { name: "stacy", amount: "34.05",  date: "01/04/2016" },
    ];

    const result = rollups(data, v => v.length, d => d.name);
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

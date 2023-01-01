"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { autoType } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-013-autoType</title>
        <meta name="description" content="d3-013-autoType 예시 코드 페이지입니다." />
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

    example1();
  }, []);

  function example1() {
    /*
      d3.autoType 은 받은 데이터를 숫자 또는 날짜타입으로 
      자동 형변환을 한 데이터로 반환해주는 역할을 한다.
    */

    console.log(`d3.autoType({date: "2007-04-23", close: "93.24"})`, autoType({date: "2007-04-23", close: "93.24"}));
    console.log(`d3.autoType({date: "2007"})`, autoType({date: "2007"}));
    console.log(`d3.autoType({id: "06075"})`, autoType({id: "06075"}));
    console.log(`d3.autoType([
      "$1.00", // currency symbol
      "(123)", // parenthesis
      "1,234", // comma
      "12px" // suffix
    ])`, autoType([
      "$1.00", // currency symbol
      "(123)", // parenthesis
      "1,234", // comma
      "12px" // suffix
    ]));
    console.log(`d3.autoType([
      "January 1, 2018", // not YYYY-MM-DD
      "TRUE", // not lowercase
      "true"
    ])`, autoType([
      "January 1, 2018", // not YYYY-MM-DD
      "TRUE", // not lowercase
      "true"
    ]));
  }

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
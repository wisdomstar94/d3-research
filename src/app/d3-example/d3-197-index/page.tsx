"use client"
import { index } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-index-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-197-index</title>
        <meta name="description" content="d3-197-index 예시 코드 페이지입니다." />
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
      d3.index 함수는 키를 요소로 갖는 맵을 반환하지만 
      객체를 배열 대신 고유한 값으로 가져옵니다.
    */

    const data = [
      {name: "ABC", amount: "34.0",   date: "11/12/2015"},
      {name: "DEF", amount: "120.11", date: "11/12/2015"},
      {name: "MNO", amount: "12.01",  date: "01/04/2016"},
      {name: "XYZ", amount: "34.05",  date: "01/04/2016"},
    ];
    
    // 키로 설정한 값이 중복되는게 존재하면 에러 발생함!
    try {
      const result = index(data, d => d.date);
      console.log(`result`, result);
    } catch(e) {
      console.error(`e`, e);
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

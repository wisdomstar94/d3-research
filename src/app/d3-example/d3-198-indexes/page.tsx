"use client"
import { indexes } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-indexes-method/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-198-indexes</title>
        <meta name="description" content="d3-198-indexes 예시 코드 페이지입니다." />
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
      d3.indexes 함수는 키를 요소로 갖는 중첩 맵 대신 중첩 배열을 얻을 수 있습니다. 
      이 방법을 사용하여 객체를 배열 대신 고유한 값으로 얻습니다.
    */

    const data = [
      {name: "ABC", amount: "34.0",   date: "11/12/2015"},
      {name: "DEF", amount: "120.11", date: "11/12/2015"},
      {name: "MNO", amount: "12.01",  date: "01/04/2016"},
      {name: "XYZ", amount: "34.05",  date: "01/04/2016"},
    ];
    
    // 키로 설정한 값이 중복되는게 존재하면 에러 발생함!
    try {
      const result = indexes(data, d => d.name);
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

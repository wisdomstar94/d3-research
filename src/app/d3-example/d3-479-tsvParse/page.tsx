"use client"
import { tsvFormat, tsvParse } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-479-tsvParse</title>
        <meta name="description" content="d3-479-tsvParse 예시 코드 페이지입니다." />
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
      d3.tsvParse 함수는 dsvFormat("\t").parse 와 동일합니다.
    */
    
    const rows = [
      { name: 'a', age: 20 },
      { name: 'b', age: 22 },
      { name: 'c', age: 24 },
      { name: 'd', age: 26 },
      { name: 'e', age: 28 },
    ];
    const tsvContent = tsvFormat(rows);

    const result = tsvParse(tsvContent);
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

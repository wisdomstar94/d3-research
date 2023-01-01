"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { dsv } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-fetch#dsv

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-079-dsv</title>
        <meta name="description" content="d3-079-dsv 예시 코드 페이지입니다." />
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
      d3.dsv 는 지정된 입력 URL에서 DSV 파일을 가져옵니다.
      즉, csv 를 parse 하는 함수입니다.
    */

    dsv(',', '/csv/sample.csv').then((data) => {
      console.log('data', data);
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

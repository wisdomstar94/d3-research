"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { csvFormat } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://github.com/d3/d3-dsv

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-042-csvFormat</title>
        <meta name="description" content="d3-042-csvFormat 예시 코드 페이지입니다." />
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

    /*
      d3.csvFormat 함수는 데이터를 csv 포맷형태로 변환해주는 함수입니다.
    */

    const data1 = [
      { name: "apple", price: "2,000" }, 
      { name: "melon", price: "7,500" },
    ];
    console.log('data1', data1);
    const data1ToCsv = csvFormat(data1);
    console.log('data1ToCsv');
    console.log(data1ToCsv);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

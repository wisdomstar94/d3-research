"use client"
import { utcFormat } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-484-utcFormat</title>
        <meta name="description" content="d3-484-utcFormat 예시 코드 페이지입니다." />
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
      d3.utcFormat 함수는 timeFormat과 동일하지만 
      모든 지시어는 현지 시간이 아닌 UTC(Coordinated Universal Time)로 해석됩니다.
    */
    const formatFn = utcFormat('.%L'); // https://devdocs.io/d3~7/d3-time-format#locale_format
    console.log(`formatFn(new Date)`, formatFn(new Date));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { utcMilliseconds } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-490-utcMilliseconds</title>
        <meta name="description" content="d3-490-utcMilliseconds 예시 코드 페이지입니다." />
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
      d3.utcMilliseconds 함수는 
      d3.timeMillisecond.range 및 d3.utcMillisecond.range에 대한 별칭입니다.
    */
    const start = new Date(1674100580634);
    const end = new Date(1674100597634);

    const result = utcMilliseconds(start, end);
    console.log(`result`, result.map(x => x.getTime()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

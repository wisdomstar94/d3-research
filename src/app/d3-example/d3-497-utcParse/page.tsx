"use client"
import { utcParse } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-497-utcParse</title>
        <meta name="description" content="d3-497-utcParse 예시 코드 페이지입니다." />
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
      d3.utcParse 함수는 기본 로케일에서 locale.utcParse에 대한 별칭입니다.
    */
    const parseFn = utcParse('%Y-%m-%dT%H:%M:%S%Z');
    console.log(`parseFn('2017-02-18T09:00:00+06:00')`, parseFn('2017-02-18T09:00:00+06:00'));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

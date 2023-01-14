"use client"
import { formatPrefix, precisionPrefix } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-311-precisionPrefix</title>
        <meta name="description" content="d3-311-precisionPrefix 예시 코드 페이지입니다." />
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
      d3.precisionPrefix 함수는 로케일과 함께 사용하기 위해 제안된 10진수 정밀도를 반환합니다.
      formatPrefix 지정된 숫자 스텝 및 참조 값.
    */
    const p = precisionPrefix(1e5, 1.3e6);
    const f = formatPrefix(`.${p}`, 1.3e6);
    console.log(`f(1.1e6);`, f(1.1e6)); // "1.1M"
    console.log(`f(1.2e6);`, f(1.2e6)); // "1.2M"
    console.log(`f(1.3e6);`, f(1.3e6)); // "1.3M"
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

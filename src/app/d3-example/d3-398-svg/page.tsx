"use client"
import { svg } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-398-svg</title>
        <meta name="description" content="d3-398-svg 예시 코드 페이지입니다." />
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
      d3.svg 함수는 지정한 입력 URL의 파일을 텍스트로 가져와서 SVG로 구문 분석하고 SVG 문서의 약속을 반환합니다.

      init이 지정된 경우 기본 호출로 전달되어 가져오기가 수행됩니다.
    */
    svg('/svg/fingerprint.svg').then((data) => {
      boxElementRef.current?.appendChild(data.querySelector('svg')!);
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

"use client"
import { nice } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-291-nice</title>
        <meta name="description" content="d3-291-nice 예시 코드 페이지입니다." />
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
      d3.nice 함수는 지정된 간격 [시작, 중지]를 포함하는 새 간격 [niceStart, niceStop]을 반환합니다. 
      여기서 niceStart 및 niceStop은 해당 눈금 단계와 정렬됩니다. 
      d3.tickIncrement와 마찬가지로 시작이 중지보다 작거나 같아야 합니다.
    */
    const result = nice(3, 50, 3); // count 인자는 눈금수..?
    console.log(`result`, result);
    // 어떤 계산/로직으로 데이터가 반환되는지 아직은 모르겠음..!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

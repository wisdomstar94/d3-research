"use client"
import { local } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-278-local</title>
        <meta name="description" content="d3-278-local 예시 코드 페이지입니다." />
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
      d3.local 함수는 새로운 지역 변수를 선언합니다.
    */
    const val = local<Set<string>>();
    val.set(boxElementRef.current!, new Set(['hi', 'hello']));
    console.log(`val.get(boxElementRef.current)`, val.get(boxElementRef.current!));
    // elemenot 에 value 를 저장해 둘 수 있는 것 같음..!
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

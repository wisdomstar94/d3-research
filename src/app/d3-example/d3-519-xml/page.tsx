"use client"
import { xml } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-519-xml</title>
        <meta name="description" content="d3-519-xml 예시 코드 페이지입니다." />
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
      d3.xml 함수는 기본 MIME 유형 application/xml을 사용하여 
      지정된 URL에서 XML 파일을 가져오는 새 요청을 반환합니다
    */
    xml("/xml/sample.xml").then((data) => {
      console.log(`data`, data);
      // data.forEach((item) => {
      //   console.log('item', item);
      // });
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

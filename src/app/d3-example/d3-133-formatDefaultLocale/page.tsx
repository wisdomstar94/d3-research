"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { json, FormatLocaleDefinition, formatDefaultLocale, format } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-format#formatdefaultlocale
// https://runebook.dev/ko/docs/d3/d3-format
// https://github.com/d3/d3-format/tree/main/locale

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-133-formatDefaultLocale</title>
        <meta name="description" content="d3-133-formatDefaultLocale 예시 코드 페이지입니다." />
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
      d3.formatDefaultLocale
      => d3.format 및 d3.formatPrefix를 새 로케일의 locale.format 및 locale.formatPrefix로 재정의한다는 점을 제외하고 d3.formatLocale과 동일합니다. 
      기본 로케일을 설정하지 않으면 기본적으로 미국 영어로 설정됩니다.
    */
    
    json("https://cdn.jsdelivr.net/npm/d3-format@3/locale/ko-KR.json").then((data) => {
      const locale = data as FormatLocaleDefinition;
      formatDefaultLocale(locale);
      console.log(`d3.format("$,")(1234.56)`, format("$,")(1234.56));
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

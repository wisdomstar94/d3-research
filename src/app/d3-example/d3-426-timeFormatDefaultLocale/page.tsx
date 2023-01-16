"use client"
import { json, timeFormat, timeFormatDefaultLocale, TimeLocaleDefinition } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-426-timeFormatDefaultLocale</title>
        <meta name="description" content="d3-426-timeFormatDefaultLocale 예시 코드 페이지입니다." />
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
      d3.timeFormatDefaultLocale 함수는 d3.timeFormatLocale과 동일하지만 
      d3.timeFormat, d3.timeParse, d3.utcFormat 및 d3.utcParse를 새 로케일의 로케일로 재정의합니다.
      format, locale.parse, locale.utcFormat 및 locale.utcParse. 기본 로케일을 설정하지 않으면 
      기본적으로 미국 영어로 설정됩니다.
    */
    json<TimeLocaleDefinition>("https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/ko-KR.json").then((locale) => {
      console.log(`locale`, locale);
      if (locale === undefined) {
        return;
      }

      timeFormatDefaultLocale(locale);
      const format = timeFormat("%c");
      console.log(`format(new Date)`, format(new Date));
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

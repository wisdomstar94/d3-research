"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { formatLocale } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-format#formatlocale
// https://runebook.dev/ko/docs/d3/d3-format

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-134-formatLocale</title>
        <meta name="description" content="d3-134-formatLocale 예시 코드 페이지입니다." />
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
      d3.formatLocale
      => locale.format 및 locale.formatPrefix 메서드를 사용하여 지정된 정의에 대한 Locale 개체를 반환합니다. 
        정의에는 다음 속성이 포함되어야 합니다.

        - decimal : 소수점(예: ".").
        - thousands : 그룹 구분 기호(예: ",").
        - grouping : 그룹 크기의 배열(예: [3]), 필요에 따라 순환됩니다.
        - currency : 통화 접두사 및 접미사(예: ["$", ""])
        - numerals : (option) 숫자 0-9를 대체할 10개의 문자열 배열.
        - percent : (option) 백분율 기호(기본값은 "%")입니다.
        - minus : (option) 빼기 기호(기본값은 "-").
        - nan : (option) 숫자가 아닌 값(기본값 "NaN").
    */

    const locale = formatLocale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["₩", ""],
      minus: "\u2212",
      percent: "\u202f%"
    });

    console.log(`locale.format("$,")(123456.25)`, locale.format("$,")(123456.25));

  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

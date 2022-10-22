import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { formatSpecifier, precisionFixed, format } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-format#formatspecifier

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-136-formatSpecifier</title>
        <meta name="description" content="d3-136-formatSpecifier 예시 코드 페이지입니다." />
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
      d3.formatSpecifier
      => 지정된 지정자를 구문 분석하여 형식 사양 미니 언어 및 지정자를 재구성하는 toString 메서드에 해당하는 노출된 필드가 있는 개체를 반환합니다. 
        예를 들어, formatSpecifier("s")는 다음을 반환합니다.

        FormatSpecifier {
          "fill": " ",
          "align": ">",
          "sign": "-",
          "symbol": "",
          "zero": false,
          "width": undefined,
          "comma": false,
          "precision": undefined,
          "trim": false,
          "type": "s"
        }

        이 방법은 형식 지정자를 구문 분석하고 새 지정자를 파생하는 방법을 이해하는 데 유용합니다. 
        예를 들어, precisionFixed를 사용하여 형식을 지정하려는 숫자를 기반으로 적절한 정밀도를 계산한 다음 새 형식을 만들 수 있습니다.
    */

    const s = formatSpecifier("f");
    s.precision = precisionFixed(0.01);
    const f = format(s.toString());
    console.log(`f(42)`, f(42)); // "42.00";
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { fsum } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-array#fsum
// https://observablehq.com/@d3/d3-fsum

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-137-fsum</title>
        <meta name="description" content="d3-137-fsum 예시 코드 페이지입니다." />
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
      d3.fsum
      => 주어진 값의 전체 정밀도 합계를 반환합니다.
        더 느리긴 하지만 d3.fsum 은 더 높은 정밀도가 필요한 곳에서 d3.sum 을 대체할 수 있습니다. d3.Adder 를 사용합니다.
    */
    console.log(`d3.fsum([1, 1e-14, -1])`, fsum([1, 1e-14, -1]));
    console.log(`d3.fsum([.1, NaN, undefined, .1, .1, .1, .1, .1, .1, .1, .1, .1])`, fsum([.1, NaN, undefined, .1, .1, .1, .1, .1, .1, .1, .1, .1]));
    console.log(`d3.fsum([{ a: 10 }, { a: 1 }, { a: 3 }], d => d.a)`, fsum([{ a: 10 }, { a: 1 }, { a: 3 }], d => d.a));
    console.log(`d3.fsum([.1, .1, .1])`, fsum([.1, .1, .1]));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { format } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-format#format
// https://observablehq.com/@d3/d3-format

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-132-format</title>
        <meta name="description" content="d3-132-format 예시 코드 페이지입니다." />
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
      d3.format 은 기본 로케일의 locale.format에 대한 별칭입니다.
      d3-forma t은 사람이 사용할 수 있도록 숫자 형식을 지정하는 데 도움이 됩니다.
    */
    console.log(`d3.format(".1f")(0.1 + 0.2)`, format(".1f")(0.1 + 0.2));
    console.log(`d3.format(".0%")(0.123)`, format(".0%")(0.123));
    console.log(`d3.format("($.2f")(-3.5)`, format("($.2f")(-3.5));
    console.log(`d3.format("+20")(42)`, format("+20")(42));
    console.log(`d3.format(".^20")(42)`, format(".^20")(42));
    console.log(`d3.format(".2s")(42e6) `, format(".2s")(42e6) );
    console.log(`d3.format("#x")(48879)`, format("#x")(48879));
    console.log(`d3.format(",.2r")(4223) `, format(",.2r")(4223) );
    console.log(`d3.format("s")(1500)`, format("s")(1500));
    console.log(`d3.format("~s")(-1500)`, format("~s")(-1500));
    console.log(`d3.format(".2")(42)`, format(".2")(42));
    console.log(`d3.format(".2")(4.2)`, format(".2")(4.2));
    console.log(`d3.format(".1")(42)`, format(".1")(42));
    console.log(`d3.format(".1")(4.2)`, format(".1")(4.2));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

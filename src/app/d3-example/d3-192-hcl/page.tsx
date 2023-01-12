"use client"
import { hcl } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-hcl-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-192-hcl</title>
        <meta name="description" content="d3-192-hcl 예시 코드 페이지입니다." />
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
      d3.hcl 함수는 새로운 HCL 색상을 구성하는 데 사용되며 함수의 매개변수로 지정된 색상의 HCL 속성을 반환합니다.
      쉽게 말해 css color name 을 h, c, l, opacity 값으로 반환해줌!
    */

    const color1 = hcl("red");
    const color2 = hcl("green");
    const color3 = hcl("blue");
    const color4 = hcl("springgreen");

    console.log(`color1`, color1);
    console.log(`color2`, color2);
    console.log(`color3`, color3);
    console.log(`color4`, color4);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

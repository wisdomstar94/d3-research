"use client"
import { matcher, select } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-280-matcher</title>
        <meta name="description" content="d3-280-matcher 예시 코드 페이지입니다." />
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
      d3.matcher 함수는 지정된 선택기가 지정된 경우 
      이 요소가 지정된 선택기와 일치할 경우 true를 반환하는 함수를 반환합니다. 
      이 방법은 선택에 의해 내부적으로 사용됩니다.
    */
    const matcherFn = matcher("div");
    // 즉, 내가 원하는 선택자가 특정 요소와 일치하는지 체크하고 싶은 함수를 만들 때 사용!

    const div = select(boxElementRef.current).filter(matcherFn);
    console.log('div', div);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { interpolateString } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-251-interpolateString</title>
        <meta name="description" content="d3-251-interpolateString 예시 코드 페이지입니다." />
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
      d3.interpolateString 함수는 두 문자열 사이의 보간기 함수를 반환하는 데 사용됩니다. 
      문자열 "b"의 각 숫자에 대해 함수는 
      문자열 "a"에서 숫자를 찾은 다음 
      숫자 보간기 기능을 사용하여 이러한 숫자의 보간을 반환하고 
      문자열 "b"의 나머지 부분은 템플릿으로 사용됩니다.
    */
    
    const s1 = "42 to 16";
    const s2 = "500 to 10 for 20 weeks";
    
    const interpolatoreFunc = interpolateString(s1, s2);
   
    console.log(`interpolatoreFunc(0)`, interpolatoreFunc(0));
    console.log(`interpolatoreFunc(0.25)`, interpolatoreFunc(0.25));
    console.log(`interpolatoreFunc(0.7)`, interpolatoreFunc(0.7));
    console.log(`interpolatoreFunc(1)`, interpolatoreFunc(1));
    console.log(`interpolatoreFunc(3)`, interpolatoreFunc(3));
    console.log(`interpolatoreFunc(5)`, interpolatoreFunc(5));
    
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

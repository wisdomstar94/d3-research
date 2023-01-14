"use client"
import { rgb } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://www.geeksforgeeks.org/d3-js-d3-rgb-function/

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-340-rgb</title>
        <meta name="description" content="d3-340-rgb 예시 코드 페이지입니다." />
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
      d3.rgb 함수는 새 RGB 색상을 구성합니다. 
      채널 값은 반환된 인스턴스에서 r, g 및 b 속성으로 표시됩니다. 
      이 색 공간을 탐색하려면 RGB 색 선택기를 사용하십시오.

      r, g 및 b가 지정된 경우 이 값은 반환된 색상의 채널 값을 나타냅니다. 
      불투명도도 지정할 수 있습니다. 
      CSS 색 모듈 레벨 3 지정자 문자열이 지정되면 구문 분석된 다음 RGB 색 공간으로 변환됩니다. 
      예는 색상을 참조하십시오. 
      
      색상 인스턴스를 지정하면 color.rgb를 사용하여 RGB 색 공간으로 변환됩니다. 
      color.rgb와 달리 이 메서드는 색상이 이미 RGB 색상인 경우에도 항상 새 인스턴스를 반환합니다.
    */

    const color1 = rgb("red");
    const color2 = rgb("green");
    const color3 = rgb("blue");
    
    // Getting the RGB values
    console.log(`color1`, color1);
    console.log(`color2`, color2);
    console.log(`color3`, color3);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

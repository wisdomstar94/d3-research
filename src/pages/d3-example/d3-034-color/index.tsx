import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { color } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-034-color</title>
        <meta name="description" content="d3-034-color 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    const c1 = color('steelblue'); // {r: 70, g: 130, b: 180, opacity: 1}
    console.log(`c1`, c1);
    c1!.opacity = 0.3;
    console.log(`c1.toString()`, c1?.toString()); // css 에 적용할 수 있는 값이 반환됨.
    console.log(`c1.formatHex()`, c1?.formatHex()); // 색상값을 Hex 로 반환.

    const c2 = color('#ff0000');
    console.log(`c2`, c2);
    console.log(`c2.toString()`, c2?.toString());
    console.log(`c2.formatHex()`, c2?.formatHex());

    const newC2 = c2?.darker(1.5);
    console.log(`c2.toString()`, c2?.toString()); // 기존 d3.ColorFactory 객체에는 영향 없음.
    console.log(`newC2.toString()`, newC2?.toString());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { ZoomTransform } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-007-zoom-transform</title>
        <meta name="description" content="d3-007-zoom-transform 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    const w = 400;
    const h = 400;
    const canvas = document.createElement('canvas'); 
    const context = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;

    const transform = new ZoomTransform(0.8, 100, 100); // k, x, y
    console.log('transform', transform);
    console.log('transform.toString()', transform.toString());
    if (boxElementRef.current !== null) {
      boxElementRef.current.style.transform = "translate(" + transform.x + "px," + transform.y + "px) scale(" + transform.k + ")";
    }

    if (context !== null) {
      context.font = '12px serif';
      context.fillText('테스트 입니다.', 200, 200);
      context.fillStyle = '#000';
    }

    boxElementRef.current?.appendChild(canvas);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
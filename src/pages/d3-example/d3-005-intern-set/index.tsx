import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { InternSet } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-005-intern-set</title>
        <meta name="description" content="d3-005-intern-set 예시 코드 페이지입니다." />
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
    // const h = (w * 9) / 16;
    const h = 400;
    const canvas = document.createElement('canvas'); 
    canvas.width = w;
    canvas.height = h;

    // javascript 의 Set 클래스와 동일한 기능을 하는 것 같음.
    const pocket = new InternSet();

    pocket.add('value1');
    pocket.add('value2');
    // pocket.add('value1'); // 중복 값은 허용되지 않음! (데이터가 들어가지 않음)
    pocket.add(2022);

    console.log('pocket', pocket);
    console.log('pocket.size', pocket.size);
    console.log(`pocket.has(2021)`, pocket.has(2021));
    console.log(`pocket.has(2022)`, pocket.has(2022));

    pocket.forEach((value) => {
      console.log('value', value);
    });

    console.log(`==============================`);

    const jsSet = new Set();
    jsSet.add(new Date(2021, 4, 1));
    jsSet.add(new Date(2022, 3, 8));
    jsSet.add(new Date(2022, 3, 8));
    console.log(`jsSet`, jsSet);

    console.log(`==============================`);

    const d3InternSet = new InternSet();
    d3InternSet.add(new Date(2021, 4, 1));
    d3InternSet.add(new Date(2022, 3, 8));
    d3InternSet.add(new Date(2022, 3, 8));
    console.log(`d3InternSet`, d3InternSet);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { InternMap } from 'd3';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-004-intern-map</title>
        <meta name="description" content="d3-004-intern-map 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContents />
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

    // javascript 의 new Map() 과 동일한 기능인 것 같으나, d3 에서 사용하는 용도로 따로 만든 듯 함. 기본으로 제공되는 Map 에서는 키로 사용이 불가능한 것이 internMap 에서는 사용 가능한 것 같음.
    const d3Map = new InternMap();
    console.log('d3Map', d3Map);
    d3Map.set('key1', 'val1');
    d3Map.set('key2', 2);
    d3Map.set(new Date(2022, 4, 1), 'date wow!');
    d3Map.set(['1', '2', '3'], 'array wow!');
    d3Map.set({ a: 'a' }, 'a wow!');
    console.log('d3Map', d3Map);

    d3Map.forEach((value, key) => {
      console.log('key', key);
      console.log('value', value);
    });

    console.log(`d3Map.get('key2')`, d3Map.get('key2'));
    console.log(`d3Map.get(new Date(2022, 4, 1))`, d3Map.get(new Date(2022, 4, 1)));
    console.log(`d3Map.get(['1', '2', '3'])`, d3Map.get(['1', '2', '3']));
    console.log(`d3Map.get({ a: 'a' })`, d3Map.get({ a: 'a' }));


    console.log(`==============================`);

    const jsMap = new Map();
    jsMap.set(new Date(2022, 7, 1), 'jsMap Data!');
    console.log(`jsMap.get(new Date(2022, 7, 1))`, jsMap.get(new Date(2022, 7, 1)));

    console.log(`==============================`);

    const d3InternMap = new InternMap();
    d3InternMap.set(new Date(2022, 7, 1), 'd3InternMap Data!');
    console.log(`d3InternMap.get(new Date(2022, 7, 1))`, d3InternMap.get(new Date(2022, 7, 1)));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
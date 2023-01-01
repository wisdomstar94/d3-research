"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { Adder } from 'd3';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-001-adder</title>
        <meta name="description" content="d3-001-adder 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContents />      
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adder = new Adder();

    const value1 = 0.031333333333233333;
    const value2 = 0.139999999999000001;
    const value3 = 0.333333333333333331;

    adder.add(value1);
    adder.add(value2);
    adder.add(value3);

    console.log(`sum            `, value1 + value2 + value3);
    console.log(`adder.valueOf()`, adder.valueOf());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
        
      </div>
    </>
  );
};

export default Index;
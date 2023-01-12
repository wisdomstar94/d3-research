"use client"
import { groups } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-191-groups</title>
        <meta name="description" content="d3-191-groups 예시 코드 페이지입니다." />
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
      d3.groups 함수는 d3.group 과 유사하지만 결과를 Map 으로 반환하지 않고
      배열로 반환한다는 차이가 있음.
    */

    const data = [
      {name: "ABC", amount: "34.0",   date: "2015-11-12"},
      {name: "DEF", amount: "120.11", date: "2015-11-12"},
      {name: "MNO", amount: "12.01",  date: "2016-01-04"},
      {name: "XYZ", amount: "34.05",  date: "2016-01-04"},
      {name: "SST", amount: "57.44",  date: "2017-05-21"},
    ];
    console.log(`data`, data);

    const groups_data = groups(data, d => d.date);
    console.log('groups_data', groups_data);
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

"use client"
import { timeInterval } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-432-timeInterval</title>
        <meta name="description" content="d3-432-timeInterval 예시 코드 페이지입니다." />
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
      d3.timeInterval 함수는 지정된 바닥 및 간격띄우기 함수와 
      선택적 카운트 함수가 지정된 새 사용자 지정 구간을 구성합니다.

      바닥 함수는 단일 날짜를 인수로 사용하고 가장 가까운 구간 경계로 반올림합니다.

      오프셋 함수는 날짜와 정수 단계를 인수로 사용하고 지정된 날짜를 지정된 경계 개수만큼 전진시킵니다. 
      단계는 양수, 음수 또는 0일 수 있습니다.

      선택적 카운트 함수는 시작 날짜와 종료 날짜를 사용하며, 이미 현재 간격으로 플로어되어 있으며, 
      시작(단독)과 종료(포함) 사이의 경계 수를 반환합니다. 
      카운트 함수를 지정하지 않으면 반환된 간격이 interval.count 또는 interval.every 메서드를 표시하지 않습니다. 
      참고: 내부 최적화로 인해 지정된 카운트 함수가 다른 시간 간격에서 interval.count를 호출하면 안 됩니다.

      선택적 필드 함수는 현재 간격으로 이미 플로어된 날짜를 사용하고 
      이 날짜(단독)와 최근 이전 부모 경계 사이의 경계 수에 해당하는 지정된 날짜의 필드 값을 반환합니다. 
      예를 들어 d3.timeDay 간격의 경우 월이 시작된 이후의 일 수를 반환합니다. 
      필드 함수를 지정하지 않으면 1970년 1월 1일 UTC의 UNIX 이후 간격 경계의 수를 세는 것으로 기본 설정됩니다. 
      필드 함수는 interval.every의 동작을 정의합니다.
    */
      const fn = timeInterval((date) => {
        console.log(`timeInterval.date`, date);
      }, (date, step) => {
        console.log(`timeInterval.date`, date);
        console.log(`timeInterval.step`, step);
      });
      const date = fn(new Date());
      console.log(`date`, date); 
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

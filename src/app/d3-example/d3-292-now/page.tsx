"use client"
import { now } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-292-now</title>
        <meta name="description" content="d3-292-now 예시 코드 페이지입니다." />
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
      d3.now 함수는 사용 가능한 경우 performance.now로 정의된 현재 시간을 반환하고, 
      사용 가능하지 않은 경우 Date.now로 정의된 현재 시간을 반환합니다. 
      현재 시간은 프레임이 시작될 때 업데이트되므로 
      프레임 중에 일정하게 유지되며 동일한 프레임 동안 예약된 타이머가 동기화됩니다. 
      이 방법이 사용자 이벤트에 대한 응답과 같이 프레임 외부에서 호출되는 경우, 
      현재 시간이 계산된 후 다음 프레임까지 고정되므로 이벤트 처리 중에 다시 일정한 타이밍이 보장됩니다.
    */
    console.log(`now()`, now());
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

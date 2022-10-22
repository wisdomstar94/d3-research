import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, range, easeLinear, active, interpolateRgb } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-008-active</title>
        <meta name="description" content="d3-008-active 예시 코드 페이지입니다." />
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

    const n = 10;

    const whiteblue = interpolateRgb("#eee", "steelblue");
    const blueorange = interpolateRgb("steelblue", "orange");
    const orangewhite = interpolateRgb("orange", "#eee");
  
    select(boxElementRef.current)
    .selectAll("div")
    .data(range(n))
    .enter()
    .append("div")
    .transition()
    .delay(function(d, i) { 
      const delayValue = (i + Math.random() * n / 4) * 1000; 
      console.log('delayValue', delayValue);
      return delayValue; 
    })
    .ease(easeLinear)
    .on("start", function repeat() {
      console.log('repeat', active(this));

      active(this)
      ?.styleTween("background-color", function() { 
        console.log('styleTween : 회색 -> 파랑색'); // 회색 -> 파랑색
        return whiteblue; 
      })
      .transition()
      .delay(1000) // 1초 딜레이 적용
      .styleTween("background-color", function() { 
        console.log('styleTween : 파랑색 -> 주황색'); // 파랑색 -> 주황색
        return blueorange; 
      })
      .transition()
      .delay(1000) // 1초 딜레이 적용
      .styleTween("background-color", function() { 
        console.log('styleTween : 주황색 -> 회색'); // 주황색 -> 회색
        return orangewhite; 
      })
      .transition()
      .delay(1000) // 1초 딜레이 적용
      .on("start", repeat);
    });
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
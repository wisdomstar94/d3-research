"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, range, easeLinear, active, interpolateRgb, Transition, BaseType, Selection } from 'd3';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-008-active</title>
        <meta name="description" content="d3-008-active 예시 코드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContents />
    </>
  );
};

const PageContents = () => {
  const boxElementRef = useRef<HTMLDivElement>(null);
  // const d3TSelectRef = useRef<Selection<BaseType, unknown, HTMLDivElement | null, unknown>>();
  // const d3TransitionRef = useRef<Transition<HTMLDivElement, number, HTMLDivElement | null, unknown>>();
  const repeatFunctionRef = useRef<() => void>();

  useEffect(() => {
    console.log('start');

    boxElementRef.current?.childNodes.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    const n = 10;

    const whiteblue = interpolateRgb("#eee", "steelblue");
    const blueorange = interpolateRgb("steelblue", "orange");
    const orangewhite = interpolateRgb("orange", "#eee");
  
    // d3TSelectRef.current = select(boxElementRef.current).selectAll("div");
    // select(boxElementRef.current)
    // .selectAll("div")
    repeatFunctionRef.current = function() {
      const t = this as any;
      console.log('repeat', active(t));

      active(t)
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
      .on("start", repeatFunctionRef.current ?? function() {
        console.log('뀨?');
      });
    };

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
    .on("start", repeatFunctionRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log('@@@ @@@ @@@');
      console.log('@@@ @@@ @@@');
      console.log('@@@ @@@ @@@');
      console.log('remove.... !!!');
      console.log('@@@ @@@ @@@');
      console.log('@@@ @@@ @@@');
      console.log('@@@ @@@ @@@');
      // d3TransitionRef.current?.on("start", null);
      repeatFunctionRef.current = () => {
        console.log('계속 호출 되는지...?');
      };
    };
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, arc } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-009-arc</title>
        <meta name="description" content="d3-009-arc 예시 코드 페이지입니다." />
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

    const svgD3Instance = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300")
      .append("g")
      .append("path")
      .attr("class", "arc")
      .attr("d", function(d) {
        return arc()({
          innerRadius: 40,
          outerRadius: 70,
          // outerRadius 와 innerRadius 사이의 영역에 호가 그려집니다. 즉, 호의 굵기를 크게하려면 outerRadius - innerRadius 값이 크게 나오게 하면 됨.
          startAngle: 0, // 호의 시작 각도, 0 이 12시 방향이고 값이 커질 수록 시계방향으로 이동됨.
          endAngle: 2.2, // 호의 끝 각도, 0 이 12시 방향이고 값이 커질 수록 시계방향으로 이동됨.
          // 각도 증가폭이 커서 소숫점 단위로 증가시켜야 그려지는 각도가 조금씩만 증가함.
        });
      })
      .attr("fill", "green")
      .attr("transform", "translate(200, 200)");
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
        
      </div>
    </>
  );
};

export default Index;
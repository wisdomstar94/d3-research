import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { areaRadial, select, arc } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

interface Data {
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-011-areaRadial</title>
        <meta name="description" content="d3-011-areaRadial 예시 코드 페이지입니다." />
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
    boxElementRef.current?.childNodes?.forEach((item) => {
      boxElementRef.current?.removeChild(item);
    });

    example1();
  }, []);

  function example1() {
    const datas: Data[] = [
      {
        startAngle: 0,
        endAngle: 0,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 1.04,
        endAngle: 1.04,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 2.08,
        endAngle: 2.08,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 3.12,
        endAngle: 3.12,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 4.16,
        endAngle: 4.16,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 5.20,
        endAngle: 5.20,
        innerRadius: 20,
        outerRadius: 50,
      },
      {
        startAngle: 6.28,
        endAngle: 6.28,
        innerRadius: 20,
        outerRadius: 50,
      },
    ];
  
    /*
      [ 그려지는 과정 ] 
      1) 0,0 에서 y 축 위 방향으로 innerRadius 숫자 거리만큼 위치한 곳에 시작점을 찍음.
      2) 0,0 과 시작점을 잇는 선을 startAngle 각도 수치 만큼 시계 방향으로 회전 시킴.
      3) 0,0 에서 y 축 위 방향으로 outerRadius 숫자 거리만큼 위치한 곳에 종료점을 찍음.
      4) 0,0 과 종료점을 잇는 선을 endAngle 각도 수치 만큼 시계 방향으로 회전 시킴.
      5) 회전 시킨 후 위치한 시작점과 종료점을 이어 선을 그름.
      6) 마찬가지로 1번~5번 과정을 거쳐 생성된 선과 이전에 생성된 선을 이어 하나의 면적을 만듬.
    */
    const gen = areaRadial<Data>()
      .startAngle(d => {
        return d.startAngle; 
      })
      .endAngle(d => {
        return d.endAngle;
      })
      .innerRadius(d => {
        return d.innerRadius; 
      })
      .outerRadius(d => {
        return d.outerRadius; 
      })
    ;
      
    select(boxElementRef.current)
      .append("svg")
      .attr("width", "300")
      .attr("height", "300")
      .append("g")
      .attr("transform", "translate(150, 150)")
      .append("path")
      .attr("d", gen(datas))
      .attr("fill", "green")
      .attr("stroke", "black");
  
    select(boxElementRef.current).select("svg").append("g").attr("transform", "translate(150, 150)").append("path")
      .attr("class", "arc")
      .attr("d", function(d) {
        return arc()({
          innerRadius: 2,
          outerRadius: 4,
          startAngle: 0, // 호의 시작 각도, 12시 방향에서 0
          endAngle: 8, // 호의 끝 각도, 12시 방향에서 0
          // 각도 증가폭이 커서 소숫점 단위로 증가시켜야 그려지는 각도가 조금씩만 증가함.

          // padAngle: 30,
        });
      })
      .attr("fill","green");
  }

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;
"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { range, select, forceSimulation, forceCollide, forceRadial } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forceradial
// https://bl.ocks.org/mbostock/cd98bf52e9067e26945edd95e8cf6ef9
// https://www.d3indepth.com/force-layout/

interface Data {
  type: 'a' | 'b';
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-128-forceRadial</title>
        <meta name="description" content="d3-128-forceRadial 예시 코드 페이지입니다." />
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

    const data: Data[] = ([] as Data[]).concat(
      range(80).map(function() { return {type: "a"}; }),
      range(160).map(function() { return {type: "b"}; })
    );
  
    setInterval(() => {
      console.log('...data', data);
    }, 1000);
  
    const width = 300;
    const height = 300;
  
    const svg = select(boxElementRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const circle = svg
      .append('g')
      .selectAll("circle")
      .data(data)
      .enter()
      .append('circle')
      .attr('r', d => 5)
      .attr('style', 'fill: #f00')
    ;
  
    // 이 simulation 에 의해 data 의 x, y 값이 지속적으로 바뀜. 값이 바뀔 때마다 simulation.on('tick') 에 설정한 콜백함수가 호출됨.
    const simulation = forceSimulation(data as any)
      .force("collide", forceCollide().radius(5).strength(2)) // strength 값이 높을수록 요소들이 더 멀리 떨어짐.
      // .force("manyBody", d3.forceManyBody().strength(10).distanceMax(50).distanceMin(20))
      /*
        d3.forceRadial 는 "x,y" 를 중심으로 지정된 반지름의 원을 향해 새 위치력을 작성합니다. x와 y를 지정하지 않으면 기본값은 "0,0"입니다.
  
        d3.forceRadial().strength
        => 강도가 지정된 경우 강도 접근기를 지정된 숫자 또는 함수로 설정하고 각 노드에 대한 강도 접근기를 다시 평가한 다음 이 힘을 반환합니다. 
          강도에 따라 노드의 x 및 y 속도 증가량이 결정됩니다. 
          예를 들어, 0.1 값은 노드가 현재 위치에서 각 응용 프로그램이 있는 원의 가장 가까운 점까지 10분의 1을 이동해야 함을 나타냅니다. 
          값이 클수록 노드가 대상 위치로 더 빠르게 이동하며, 종종 다른 힘이나 제약 조건을 희생합니다. [0,1] 범위를 벗어나는 값은 권장되지 않습니다.
  
        d3.forceRadial().radius
        => 반지름이 지정된 경우 원 반지름을 지정된 숫자 또는 함수로 설정하고 각 노드에 대한 반지름 접근기를 다시 평가한 다음 이 힘을 반환합니다. 
          반지름을 지정하지 않으면 현재 반지름 액세스기를 반환합니다.
          반경 접근기는 시뮬레이션의 각 노드에 대해 호출되며 노드와 0 기반 인덱스를 통과합니다. 
          그 후, 그 결과 숫자는 내부에 저장되므로, 각 노드의 목표 반경은 힘이 초기화될 때 또는 이 방법이 힘의 모든 적용에서가 아니라 새로운 반경으로 호출될 때에만 재계산됩니다.
  
        d3.forceRadial().x
        => x가 지정된 경우 원 중심의 x 좌표를 지정된 숫자로 설정하고 이 힘을 반환합니다. 
          x를 지정하지 않으면 현재 중심 x 좌표를 반환합니다. 이 좌표는 기본값이 0입니다.
  
        d3.forceRadial().y
        => y를 지정한 경우 원 중심의 y 좌표를 지정된 숫자로 설정하고 이 힘을 반환합니다. 
          y를 지정하지 않으면 기본값이 0인 현재 중심 y 좌표를 반환합니다.
      */
      .force("r", forceRadial(function(d: any) { return d.type === 'a' ? 50 : 100; }).x(width / 2).y(height / 2).strength(10))
      // .force("center", d3.forceCenter(width / 2, height / 2))
      // .force(
      //   'link', 
      //   d3
      //     .forceLink()
      //     .id((d: any) => { 
      //       console.log('forceLink.id.d', d); 
      //       return d.id!;
      //     })
      //     .distance(10)
      //     .strength(800)
      //     .links(nodeLinks)
      //   ,
      // ) 
      .alpha(0.1)
      .alphaDecay(0)
    ;
    
    simulation
      .on('tick', ticked)
      .on('end', tickEnded)
    ;
  
    function ticked() {
      // 이미 circle 요소들에 data 를 바인딩했으므로, function (d) 의 값은 simulation 에 의해 변경된 값이 참조됨.
      circle
        .attr('cx', function(d: any) {
          // console.log('cx.d', d);
          return d.x; // simulation 에 의해 변경된 값으로 cx 값을 변경.
        })
        .attr('cy', function(d: any) {
          // console.log('cy.d', d);
          return d.y; // simulation 에 의해 변경된 값으로 cy 값을 변경.
        });
    }
  
    function tickEnded() {
      // console.log('tickEnded');
    }
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

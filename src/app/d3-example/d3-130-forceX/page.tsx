"use client"
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { range, select, forceSimulation, forceCollide, forceX } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forcex
// https://www.d3indepth.com/force-layout/

interface Data {
  type: 'a' | 'b';
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-130-forceX</title>
        <meta name="description" content="d3-130-forceX 예시 코드 페이지입니다." />
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
      .force("collide", forceCollide().radius(5).strength(1.5)) // strength 값이 높을수록 요소들이 더 멀리 떨어짐.
      // .force("manyBody", d3.forceManyBody().strength(10).distanceMax(50).distanceMin(20))
      /*
        d3.forceX
        => 지정된 위치 x를 향해 x축을 따라 새 위치 지정 힘을 만듭니다. x를 지정하지 않으면 기본값은 0입니다.
  
        d3.forceX().strength
        => 강도가 지정되면 강도 접근자를 지정된 숫자 또는 함수로 설정하고 각 노드에 대한 강도 접근자를 다시 평가하고 이 힘을 반환합니다. 
           강도는 노드의 x-속도를 증가시킬 정도를 결정합니다: (x - node.x) × 강도. 
           
           예를 들어, 값이 0.1이면 각 응용 프로그램에서 노드가 현재 x 위치에서 대상 x 위치로 1/10만큼 이동해야 함을 나타냅니다. 
           값이 높을수록 노드가 대상 위치로 더 빨리 이동하며 종종 다른 힘이나 제약 조건을 희생합니다. 
           [0,1] 범위를 벗어난 값은 권장하지 않습니다.
  
           강도 접근자는 시뮬레이션의 각 노드에 대해 호출되어 노드와 0부터 시작하는 인덱스를 전달합니다. 
           그런 다음 결과 숫자가 내부적으로 저장되어 힘이 적용될 때마다가 아니라 힘이 초기화되거나 
           이 메서드가 새로운 세기로 호출될 때만 각 노드의 강도가 다시 계산됩니다.
  
        d3.forceX().x
        => x가 지정되면 x 좌표 접근자를 지정된 숫자나 함수로 설정하고 각 노드에 대한 x 접근자를 다시 평가하고 이 힘을 반환합니다. 
           x가 지정되지 않으면 현재 x 접근자를 반환하며 기본값은 0 입니다.
  
           x-접근자는 시뮬레이션의 각 노드에 대해 호출되어 노드와 0부터 시작하는 인덱스를 전달합니다. 
           그런 다음 결과 숫자가 내부적으로 저장되어, 각 노드의 대상 x 좌표는 힘이 적용될 때마다가 아니라 힘이 초기화되거나 이 메서드가 새 x로 호출될 때만 다시 계산됩니다.
      */
      .force('x', forceX().strength(1).x(100))
     //  .force("r", d3.forceRadial(function(d: any) { return d.type === 'a' ? 50 : 100; }).x(width / 2).y(height / 2).strength(10))
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

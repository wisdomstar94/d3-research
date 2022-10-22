import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { select, forceSimulation, forceCollide, forceManyBody, forceCenter, forceLink } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forcemanybody
// https://www.d3indepth.com/force-layout/

interface Data {
  id: number;
  x: number;
  y: number;
  name: string;
}

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-127-forceManyBody</title>
        <meta name="description" content="d3-127-forceManyBody 예시 코드 페이지입니다." />
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
      d3.forceManyBody 는 기본 매개변수로 새 다체 힘을 작성합니다.
    */

    const data: Data[] = [
      { id: 1, x: 10, y: 10, name: 'name1' },
      { id: 2, x: 15, y: 15, name: 'name2' },
      { id: 3, x: 20, y: 20, name: 'name3' },
      { id: 4, x: 25, y: 25, name: 'name4' },
      { id: 5, x: 30, y: 30, name: 'name5' },
    ];

    setInterval(() => {
      console.log('...data', data);
    }, 1000);

    const width = 300;
    const height = 300;

    var nodeLinks = [
      { source: 1, target: 1, x: 10, y: 10, distance: 10 },
      { source: 2, target: 2, x: 15, y: 15, distance: 20 },
      { source: 3, target: 3, x: 20, y: 20, distance: 30 },
      { source: 4, target: 4, x: 25, y: 25, distance: 40 },
      { source: 5, target: 5, x: 30, y: 30, distance: 50 },
    ];

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
      .attr('cx', d => d.x + 110)
      .attr('cy', d => d.y + 110)
      .attr('r', d => 10)
      .attr('style', 'fill: #f00')
    ;

    const text = svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff')
      .attr('dominant-baseline', 'middle')
      .text(function(d) {
        return d.id + '';
      });

    // 이 simulation 에 의해 data 의 x, y 값이 지속적으로 바뀜. 값이 바뀔 때마다 simulation.on('tick') 에 설정한 콜백함수가 호출됨.
    const simulation = forceSimulation(data)
      .force("collide", forceCollide().radius(10).strength(3)) // strength 값이 높을수록 요소들이 더 멀리 떨어짐.
      /*
        d3.forceManyBody().strength
        => 강도가 지정된 경우 강도 접근기를 지정된 숫자 또는 함수로 설정하고 각 노드에 대한 강도 접근기를 다시 평가한 다음 이 힘을 반환합니다. 
          양의 값은 중력과 유사하게 노드들이 서로 끌어당기게 하는 반면, 
          음의 값은 노드들이 정전기와 유사하게 서로 밀어내게 합니다. 
          강도를 지정하지 않으면 현재 강도 접근기를 반환합니다. 기본값은 -30 입니다.

        d3.forceManyBody().theta
        => theta가 지정되면 Barnes를 설정합니다. 허트 근사 기준을 지정된 수로 설정하고 이 힘을 반환합니다. 
          theta를 지정하지 않으면 현재 값을 반환합니다. 기본값은 0.9 입니다.

        d3.forceManyBody().distanceMin
        => 거리를 지정한 경우 이 힘이 고려되는 노드 사이의 최소 거리를 설정합니다. 
          거리를 지정하지 않으면 현재 최소 거리를 반환합니다. 기본값은 1 입니다. 
          최소 거리는 불안정성을 피하기 위해 근처의 두 노드 사이의 힘의 강도에 상한을 설정합니다. 
          특히, 두 개의 노드가 정확히 일치할 경우 무한히 강한 힘을 피합니다. 이 경우 힘의 방향은 무작위입니다.

        d3.forceManyBody().distanceMax
        => 거리를 지정한 경우 이 힘이 고려되는 노드 간의 최대 거리를 설정합니다. 
          거리를 지정하지 않으면 현재 최대 거리를 반환합니다. 기본값은 무한대로 설정됩니다. 
          최대 거리를 제한적으로 지정하면 성능이 향상되고 레이아웃이 더 국소화됩니다.
      */
      .force("manyBody", forceManyBody().strength(250).distanceMax(150).distanceMin(50))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        'link', 
        forceLink()
          .id((d: any) => { 
            console.log('forceLink.id.d', d); 
            return d.id!;
          })
          .distance(10)
          .strength(800)
          .links(nodeLinks)
        ,
      ) 
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
        .attr('cx', function(d) {
          // console.log('cx.d', d);
          return d.x; // simulation 에 의해 변경된 값으로 cx 값을 변경.
        })
        .attr('cy', function(d) {
          // console.log('cy.d', d);
          return d.y; // simulation 에 의해 변경된 값으로 cy 값을 변경.
        });

      text
        .attr('x', function(d) {
          // console.log('cx.d', d);
          return d.x - 4; // simulation 에 의해 변경된 값으로 cx 값을 변경.
        })
        .attr('y', function(d) {
          // console.log('cy.d', d);
          return d.y + 4; // simulation 에 의해 변경된 값으로 cy 값을 변경.
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

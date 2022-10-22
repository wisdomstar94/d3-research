import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { range, select, forceSimulation, forceCollide, forceRadial } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// https://devdocs.io/d3~7/d3-force#forcesimulation
// https://www.d3indepth.com/force-layout/

interface Data {
  type: 'a' | 'b';
}


const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-129-forceSimulation</title>
        <meta name="description" content="d3-129-forceSimulation 예시 코드 페이지입니다." />
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
    /*
      d3.forceSimulation
      => 지정된 노드 배열로 힘을 사용하지 않고 새 시뮬레이션을 만듭니다. 
         노드를 지정하지 않으면 기본적으로 빈 배열로 설정됩니다. 시뮬레이터가 자동으로 시작됩니다. 
         
         시뮬레이션이 실행될 때 simulation.on을 사용하여 틱 이벤트를 수신합니다. 
         대신 시뮬레이션을 수동으로 실행하려면 simulation.stop을 호출한 다음 simulation.tick을 호출하십시오.
  
      d3.forceSimulation().restart
      => 시뮬레이션의 내부 타이머를 다시 시작하고 시뮬레이션을 반환합니다. 
         Simulation.alphaTarget 또는 Simulation.alpha와 함께 이 방법을 사용하여 상호 작용 중(예: 노드를 끌 때) 
         시뮬레이션을 "재가열"하거나 Simulation.stop으로 일시적으로 일시 중지한 후 시뮬레이션을 재개할 수 있습니다.
  
      d3.forceSimulation().stop
      => 실행 중인 경우 시뮬레이션의 내부 타이머를 중지하고 시뮬레이션을 반환합니다. 
         타이머가 이미 중지된 경우 이 메서드는 아무 것도 수행하지 않습니다. 
         이 방법은 시뮬레이션을 수동으로 실행할 때 유용합니다. simulation.tick을 참조하십시오.
      
      d3.forceSimulation().tick
      => 지정된 반복 횟수만큼 시뮬레이션을 수동으로 단계별로 실행하고 시뮬레이션을 반환합니다. 반복이 지정되지 않은 경우 기본값은 1(단일 단계)입니다.
         각 반복에 대해 현재 알파를 (alphaTarget - alpha) × alphaDecay 만큼 증가시킵니다. 
         그런 다음 등록된 각 힘을 호출하여 새 알파를 전달합니다. 
         그런 다음 각 노드의 속도를 velocity × velocityDecay 만큼 감소시킵니다. 마지막으로 각 노드의 위치를 속도로 증가시킵니다.
  
         이 메서드는 이벤트를 전달하지 않습니다. 
         이벤트는 생성 시 시뮬레이션이 자동으로 시작되거나 Simulation.restart 를 호출하여 시작될 때 내부 타이머에 의해서만 전달됩니다. 
         
         시뮬레이션이 시작될 때의 자연 틱 수는 ⌈log(alphaMin) / log(1 - alphaDecay)⌉ 입니다. 기본적으로 300입니다.
  
         이 방법은 Simulation.stop과 함께 사용하여 정적 힘 레이아웃을 계산할 수 있습니다. 
         큰 그래프의 경우 사용자 인터페이스가 정지되지 않도록 웹 작업자에서 정적 레이아웃을 계산해야 합니다.
  
      d3.forceSimulation().nodes
      => 노드가 지정되면 시뮬레이션의 노드를 지정된 객체 배열로 설정하고 필요한 경우 위치와 속도를 초기화한 다음 바인딩된 힘을 다시 초기화합니다. 
         시뮬레이션을 반환합니다. 노드가 지정되지 않은 경우 생성자에 지정된 대로 시뮬레이션의 노드 배열을 반환합니다.
  
         각 노드는 객체여야 합니다. 시뮬레이션에 의해 (추가적으로)할당되는 속성은 다음과 같습니다.
  
         - index : 노드에 대한 노드의 0부터 시작하는 인덱스
         - x : 노드의 현재 x 위치
         - y : 노드의 현재 y 위치
         - vx : 노드의 현재 x-속도
         - vy : 노드의 현재 y-속도
  
         위치 ⟨x,y⟩ 및 속도 ⟨vx,vy⟩는 힘과 시뮬레이션에 의해 이후에 수정될 수 있습니다. 
         vx 또는 vy가 NaN이면 속도는 ⟨0,0⟩으로 초기화됩니다. 
         x 또는 y가 NaN이면 위치가 phyllotaxis 배열로 초기화되므로 결정적이고 균일한 분포를 보장하도록 선택됩니다.
  
         주어진 위치에서 노드를 수정하려면 두 가지 추가 속성을 지정할 수 있습니다.
  
         - fx : 노드의 고정 x 위치
         - fy : 노드의 고정 y 위치
  
         각 틱이 끝날 때 힘을 가한 후 node.fx 가 정의된 노드는 node.x 가 이 값으로 재설정되고 node.vx가 0으로 설정됩니다. 
         마찬가지로 node.fy 가 정의된 노드는 node.y 가 이 값으로 재설정되고 node.vy가 0으로 설정됩니다. 
         이전에 수정된 노드를 수정 해제하려면 node.fx 및 node.fy를 null로 설정하거나 이러한 속성을 삭제합니다.
  
         노드가 시뮬레이션에 추가되거나 제거될 때와 같이 지정된 노드 배열이 수정되는 경우 
         이 메서드는 새(또는 변경된) 배열로 다시 호출되어 시뮬레이션 및 바인딩된 힘에 변경 사항을 알려야 합니다. 
         
         시뮬레이션은 지정된 배열의 방어적인 복사본을 만들지 않습니다.
  
      d3.forceSimulation().alpha
      => 알파는 시뮬레이션된 어닐링의 온도와 대략 유사합니다. 
         시뮬레이션이 "냉각"됨에 따라 시간이 지남에 따라 감소합니다. 
         
         알파가 alphaMin 에 도달하면 시뮬레이션이 중지됩니다. 
         Simulation.restart를 참조하십시오.
  
         알파가 지정되면 현재 알파를 [0,1] 범위의 지정된 숫자로 설정하고 이 시뮬레이션을 반환합니다. 
         알파가 지정되지 않은 경우 현재 알파 값을 반환하며 기본값은 1입니다.
  
      d3.forceSimulation().alphaMin
      => min이 지정되면 최소 알파를 [0,1] 범위의 지정된 숫자로 설정하고 이 시뮬레이션을 반환합니다. 
         min을 지정하지 않으면 현재 최소 알파 값을 반환하며 기본값은 0.001입니다. 
         
         시뮬레이션의 내부 타이머는 현재 알파가 최소 알파보다 작으면 중지됩니다. 
         ~0.0228의 기본 알파 감쇠율은 300회 반복에 해당합니다.
      
      d3.forceSimulation().alphaDecay
      => 감쇄가 지정되면 알파 감쇄 속도를 [0,1] 범위의 지정된 숫자로 설정하고 이 시뮬레이션을 반환합니다. 
         감쇄를 지정하지 않으면 현재 알파 감쇄율을 반환합니다. 
         기본값은 0.0228… = 1 - pow(0.001, 1 / 300)입니다. 여기서 0.001은 기본 최소 알파입니다.
  
         알파 감쇠율은 현재 알파가 원하는 목표 알파를 향해 얼마나 빨리 보간되는지를 결정합니다. 
         기본 타겟 알파가 0이기 때문에 기본적으로 시뮬레이션 냉각 속도를 제어합니다. 
         감쇠율이 높을수록 시뮬레이션이 더 빨리 안정화되지만 로컬 최소값에 갇힐 위험이 있습니다. 
         값이 낮으면 시뮬레이션을 실행하는 데 시간이 더 오래 걸리지만 일반적으로 더 나은 레이아웃으로 수렴됩니다. 
         시뮬레이션이 현재 알파에서 영원히 실행되게 하려면 감쇠율을 0으로 설정하십시오. 또는 최소 알파보다 큰 목표 알파를 설정합니다.
  
      d3.forceSimulation().alphaTarget
      => target이 지정되면 현재 대상 알파를 [0,1] 범위의 지정된 숫자로 설정하고 이 시뮬레이션을 반환합니다. 
         대상이 지정되지 않은 경우 현재 대상 알파 값을 반환하며 기본값은 0입니다.
  
      d3.forceSimulation().velocityDecay
      => 감쇠가 지정되면 속도 감쇠 계수를 [0,1] 범위의 지정된 숫자로 설정하고 이 시뮬레이션을 반환합니다. 
         감쇄를 지정하지 않으면 현재 속도 감쇄 계수를 반환하며 기본값은 0.4입니다. 
         감쇠 계수는 대기 마찰과 유사합니다. 틱 동안 힘을 가한 후 각 노드의 속도에 1이 곱해집니다. 
         알파 감쇠율을 낮추는 것과 마찬가지로 속도 감쇠가 적을수록 더 나은 솔루션으로 수렴될 수 있지만 수치적 불안정성과 진동의 위험이 있습니다.
  
      d3.forceSimulation().force
      => force가 지정되면 지정된 이름에 force를 할당하고 이 시뮬레이션을 반환합니다. 
         force가 지정되지 않은 경우 지정된 이름을 가진 force를 반환하거나 그러한 force가 없으면 undefined를 반환합니다. 
         (기본적으로 새 시뮬레이션에는 힘이 없습니다.) 
         
         예를 들어, 그래프 레이아웃을 위한 새 시뮬레이션을 생성하려면 다음과 같이 말할 수 있습니다.
         const simulation = d3.forceSimulation(nodes)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(links))
          .force("center", d3.forceCenter());
  
         주어진 이름의 힘을 제거하려면 null을 힘으로 전달하십시오. 예를 들어, 전하력을 제거하려면:
         simulation.force("charge", null);
  
      d3.forceSimulation().find
      => 주어진 검색 반경으로 위치 ⟨x,y⟩에 가장 가까운 노드를 반환합니다. 
         반경을 지정하지 않으면 기본적으로 무한대가 됩니다. 
         검색 영역 내에 노드가 없으면 undefined를 반환합니다.
  
      d3.forceSimulation().randomSource
      => source가 지정되면 난수를 생성하는 데 사용되는 함수를 설정합니다. 
         이것은 0(포함)과 1(제외) 사이의 숫자를 반환하는 함수여야 합니다. 
         소스가 지정되지 않은 경우 고정 시드 선형 합동 생성기로 기본 설정되는 이 시뮬레이션의 현재 임의 소스를 반환합니다. 
         random.source도 참조하십시오.
  
      d3.forceSimulation().on
      => 리스너가 지정되면 지정된 유형 이름에 대한 이벤트 리스너를 설정하고 이 시뮬레이션을 반환합니다. 
         이벤트 리스너가 동일한 유형 및 이름으로 이미 등록된 경우 새 리스너가 추가되기 전에 기존 리스너가 제거됩니다. 
         수신기가 null이면 지정된 유형 이름에 대한 현재 이벤트 수신기를 제거합니다(있는 경우). 
         listener가 지정되지 않은 경우 지정된 유형 이름과 일치하는 현재 할당된 첫 번째 수신기를 반환합니다(있는 경우). 
         지정된 이벤트가 전달되면 이 컨텍스트를 시뮬레이션으로 사용하여 각 리스너가 호출됩니다.
  
         typenames는 공백으로 구분된 하나 이상의 typename을 포함하는 문자열입니다. 
         각 typename은 유형이며 선택적으로 뒤에 마침표(.)와 이름(예: tick.foo 및 tick.bar)이 옵니다. 
         이름을 사용하면 동일한 유형에 대해 여러 리스너를 등록할 수 있습니다. 유형은 다음 중 하나여야 합니다.
  
         - tick : 시뮬레이션 내부 타이머의 각 틱 후.
         - end : alpha < alphaMin일 때 시뮬레이션의 타이머가 멈춘 후.
  
         시뮬레이션.tick이 수동으로 호출되면 틱 이벤트가 전달되지 않습니다. 
         이벤트는 내부 타이머에 의해서만 전달되며 시뮬레이션의 대화형 렌더링을 위한 것입니다. 
         시뮬레이션에 영향을 미치려면 틱 이벤트 리스너 내에서 노드의 위치나 속도를 수정하는 대신 힘을 등록하십시오.
    */
    const simulation = forceSimulation(data as any)
      .force("collide", forceCollide().radius(5).strength(2)) // strength 값이 높을수록 요소들이 더 멀리 떨어짐.
      // .force("manyBody", d3.forceManyBody().strength(10).distanceMax(50).distanceMin(20))
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

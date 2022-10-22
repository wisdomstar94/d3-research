import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { dispatch, select } from 'd3';
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

// http://using-d3js.com/08_02_dispatches.html

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-075-dispatch</title>
        <meta name="description" content="d3-075-dispatch 예시 코드 페이지입니다." />
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
      d3.dispatch 는 커스텀 이벤트를 만들고 call 을 해올 수 있는 기능을 제공하는 함수입니다.
    */
    const myDispatch = dispatch("event1", "event2");
    myDispatch.on('event1', function(args) {
      console.log('event1.args', args);
      console.log('event1.this', this); // 이벤트를 호출한 node 참조 가능.
    });
    myDispatch.on('event2', function(args) {
      console.log('event2.args', args);
      console.log('event2.this', this); // 이벤트를 호출한 node 참조 가능.
    });

    const svg = select(boxElementRef.current)
      .append('svg')
      .attr("width", "300")
      .attr("height", "300");

    const rect1 = svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 100)
      .attr('height', 100)
      .attr('style', 'fill: rgba(255, 0, 0)')
      .on("mouseenter", function() {
        console.log('rect1 mouseenter...');
        myDispatch.call("event1", this, { var1: 'hi' }); // 이벤트를 호출한 node 를 this 로 전달.
      })
    ;

    const rect2 = svg.append('rect')
      .attr('x', 150)
      .attr('y', 150)
      .attr('width', 100)
      .attr('height', 100)
      .attr('style', 'fill: rgba(255, 0, 255)')
      .on("mouseenter", function() {
        console.log('rect2 mouseenter...');
        myDispatch.call("event2", this, { var2: 'hi 2' }); // 이벤트를 호출한 node 를 this 로 전달.
      })
    ;
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

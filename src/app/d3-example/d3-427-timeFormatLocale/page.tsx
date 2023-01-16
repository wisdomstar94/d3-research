"use client"
import { timeFormatLocale } from "d3";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import CommonLayout from "../../../components/layouts/common-layout/common-layout.component";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>d3-427-timeFormatLocale</title>
        <meta name="description" content="d3-427-timeFormatLocale 예시 코드 페이지입니다." />
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
      d3.timeFormatLocale 함수는 로케일을 사용하여 지정한 정의에 대한 로케일 개체를 반환합니다.
      format, locale.parse, locale.utcFormat, locale.utcParse 메서드를 사용할 수 있습니다. 
      정의에는 다음 속성이 포함되어야 합니다:

      dateTime - the date and time (%c) format specifier (e.g., "%a %b %e %X %Y").
      date - the date (%x) format specifier (e.g., "%m/%d/%Y").
      time - the time (%X) format specifier (e.g., "%H:%M:%S").
      periods - the A.M. and P.M. equivalents (e.g., ["AM", "PM"]).
      days - the full names of the weekdays, starting with Sunday.
      shortDays - the abbreviated names of the weekdays, starting with Sunday.
      months - the full names of the months (starting with January).
      shortMonths - the abbreviated names of the months (starting with January).
    */
    const tlo = timeFormatLocale({
      dateTime: '%x, %X',
      date: '%-m/%-d/%Y',
      time: '%-I:%M:%S %p',
      periods: ['AM', 'PM'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    });
    const myFormat = tlo.format('%c');
    console.log(`myFormat(new Date())`, myFormat(new Date()));
  }, []);

  return (
    <>
      <div className="box" ref={boxElementRef}>
      
      </div>
    </>
  );
};

export default Index;

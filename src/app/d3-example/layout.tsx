import Head from "next/head";
import CommonLayout from "../../components/layouts/common-layout/common-layout.component";

// d3 example layout 
export default function D3ExampleLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>d3-research example</title>
        <meta name="description" content="d3-research example 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div data-name="d3-example-layout">
        { children }        
      </div>
    </>
  );
}

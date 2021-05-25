import Head from "next/head";
import React from "react";

export const HeadTitle: React.FC<{title: string}> = (props) => {
  return (
    <Head>
      <meta property="og:title" content={props.title} />
      <title>{props.title}</title>
    </Head>
  );
};
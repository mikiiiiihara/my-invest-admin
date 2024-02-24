import React, { FC } from "react";
import Head from "next/head";

type Props = {
  title: string;
};

const HeaderComponent: FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="This is an admin site of my-invest-manager."
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes"
      />
      <link rel="icon" href="/icon.png" />
    </Head>
  );
};

HeaderComponent.displayName = "NextHead";
export const NextHead = React.memo(HeaderComponent);

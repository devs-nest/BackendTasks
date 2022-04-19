import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>Not Found</title>
        <meta property="og:title" content="404 - Not Found" />
      </Helmet>
      <h2>404 - NotFound</h2>
    </div>
  );
};

export default {
  element: <NotFound />,
};

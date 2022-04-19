import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <div className="text-center">
      <Helmet>
        <title>Home</title>
        <meta property="og:title" content="HomePage" />
      </Helmet>

      <h1>HomePage</h1>
      <button
        onClick={() => {
          setIsClicked(!isClicked);
        }}
        className="btn btn-primary"
      >
        Click here
      </button>
      {isClicked ? (
        <>
          <h4>Hiya George!</h4>
        </>
      ) : null}
    </div>
  );
};

export default {
  element: <HomePage />,
};

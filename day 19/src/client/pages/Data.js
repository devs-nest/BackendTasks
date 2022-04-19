import React from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../actions";

const Data = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="text-center">
      <Helmet>
        <title>Data</title>
        <meta property="og:title" content="US Population" />
      </Helmet>

      <h1>US Population</h1>
      <ul className="list-inline">
        {data.map(({ Year, Population }) => {
          return (
            <li key={Year}>
              ${Year} - ${Population}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const loadData = (store) => {
  return store.dispatch(fetchData());
};

export default {
  element: <Data />,
  loadData,
};

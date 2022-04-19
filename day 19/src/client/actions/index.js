import axios from "axios";

export const FETCH_DATA = "fetch_data";

export const fetchData = () => async (dispatch) => {
  const res = await axios.get(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  );

  dispatch({
    type: FETCH_DATA,
    payload: res,
  });
};

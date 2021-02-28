import { API_URL } from "./config";

import { getJson } from "./helper";

export const state = {
  top10Air: {},
};

export const loadTop10Air = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    state.top10Air = data.top.slice(1, 10);
    console.log(state.top10Air);
  } catch (err) {
    // alert(err);
    throw err;
  }
};

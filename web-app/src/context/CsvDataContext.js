import createDataContext from "./createDataContext";
import axios from "axios";

import { toastError } from "../utils/toasts";

const SET_CSV_DATA = "setCsvData";
const SET_TYPES_ORDER = "setDataTypesOrder";
const SET_COORDINATES = "set coordinates";

export const csvDataReducer = (state, action) => {
  switch (action.type) {
    case SET_CSV_DATA:
      return {
        ...state,
        csvData: action.payload.csvData,
      };
    case SET_TYPES_ORDER:
      return {
        ...state,
        typesOrder: action.payload.typesOrder,
      };
    case SET_COORDINATES:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        coordinates: action.payload.coordinates,
      };
    default:
      return state;
  }
};

export const setCsvData = (dispatch) => (csvData) => {
  dispatch({ type: SET_CSV_DATA, payload: { csvData } });
};

export const setTypesOrder = (dispatch) => (typesOrder) => {
  dispatch({ type: SET_TYPES_ORDER, payload: { typesOrder } });
};

export const setCoordinates = (dispatch) => async (csvData, typesOrder) => {
  try {
    dispatch({
      type: SET_COORDINATES,
      payload: { isLoading: true, coordinates: [] },
    });
    const addressIndex = typesOrder.indexOf("address");
    const zipIndex = typesOrder.indexOf("zip");
    const categoryIndex = typesOrder.indexOf("category");

    const newCoordinates = [];

    for (const row of csvData) {
      const rowValues = Object.values(row);
      const address = rowValues[addressIndex];
      const zip = rowValues[zipIndex];
      const category = rowValues[categoryIndex];
      const response = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=b250d464cd7f651a2dfdce23a28d82f3&query=${address},${zip}&limit=1`
      );
      if (!response.data.data[0]) break;

      const { longitude, latitude } = response.data.data[0];
      if (!latitude || !longitude) break;

      const coordObject = {
        longitude,
        latitude,
        category,
        id: newCoordinates.length,
      };
      newCoordinates.push(coordObject);
    }
    if (newCoordinates.length === 0) {
      toastError("No locations found");
    }
    dispatch({
      type: SET_COORDINATES,
      payload: { coordinates: newCoordinates, isLoading: false },
    });
  } catch (err) {
    console.log(err);
    // handle error
  }
};

export const { Provider, Context } = createDataContext(
  csvDataReducer,
  { setCsvData, setTypesOrder, setCoordinates },
  {
    csvData: [],
    typesOrder: ["city", "state", "zip", "address", "category"],
    coordinates: [],
  }
);

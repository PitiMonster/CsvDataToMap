import React, { useContext } from "react";
import { shallow, mount } from "enzyme";

import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { Provider, Context } from "../context/CsvDataContext";
import Button from "@mui/material/Button";

// jest.mock("../context/CsvDataContext", () => {
//   const createDataContext = require("../context/createDataContext").default;
//   // const {
//   //   csvDataReducer,
//   //   setCsvData,
//   //   setTypesOrder,
//   //   setCoordinates,
//   // } = require("../context/CsvDataContext");
//   const { csvDataReducer, setCsvData, setTypesOrder, setCoordinates } =
//     jest.requireActual("../context/CsvDataContext");

//   const { Context, Provider } = createDataContext(
//     csvDataReducer,
//     { setCsvData, setTypesOrder, setCoordinates },
//     {
//       csvData: [],
//       typesOrder: ["city", "state", "zip", "address", "category"],
//       coordinates: [],
//     }
//   );
//   return { Context, Provider };
// });

test("Renders without crashing", () => {
  shallow(
    <Provider>
      <App />
    </Provider>
  );
});

test("Renders button Upload csv file", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );

  const btn = screen.getByText("Upload csv file");
  expect(btn).toBeInTheDocument();
});

test("Render modal to upload button after clicking button Upload csv file ", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  let paragraphInModal = screen.queryByText(
    "Make sure your csv file has 5 columns and contains data such as: city, state, zip, address, category"
  );
  expect(paragraphInModal).not.toBeInTheDocument();

  userEvent.click(screen.getByText("Upload csv file"));

  paragraphInModal = screen.getByText(
    "Make sure your csv file has 5 columns and contains data such as: city, state, zip, address, category"
  );

  expect(paragraphInModal).toBeInTheDocument();
});

test("Test modal navigation to 'Read csv file' section", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  userEvent.click(screen.getByText("Upload csv file"));
  const nextButton = screen.getByText("Next");
  userEvent.click(nextButton);
  screen.getByText("Read csv file");
  expect(nextButton).toBeDisabled();
});

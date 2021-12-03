import React, { useContext } from "react";
import { shallow, mount } from "enzyme";

import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { Provider, Context } from "../context/CsvDataContext";
import Button from "@mui/material/Button";
import { act } from "react-dom/test-utils";

jest.mock("../context/CsvDataContext", () => {
  const createDataContext = require("../context/createDataContext").default;
  const { csvDataReducer, setCsvData, setTypesOrder, setCoordinates } =
    jest.requireActual("../context/CsvDataContext");

  const initialCsvData = [
    {
      0: "Wroclaw",
      1: "Dolnyslask",
      2: "50-301",
      3: "10 Słowiańska",
      4: " label1",
    },
  ];

  const { Context, Provider } = createDataContext(
    csvDataReducer,
    { setCsvData, setTypesOrder, setCoordinates },
    {
      csvData: [initialCsvData],
      typesOrder: ["city", "state", "zip", "address", "category"],
      coordinates: [],
    }
  );
  return { Context, Provider };
});
test("Test navigation to 'Select order of data' section", () => {
  render(
    <Provider>
      <App />
    </Provider>
  );
  userEvent.click(screen.getByText("Upload csv file"));
  const nextButton = screen.getByText("Next");
  userEvent.click(nextButton);
  expect(nextButton).not.toBeDisabled();
});

test("Test accept typesOrder, show backdrop, displayMap", () => {
  const wrapper = render(
    <Provider>
      <App />
    </Provider>
  );

  userEvent.click(screen.getByText("Upload csv file"));
  const nextButton = screen.getByText("Next");
  userEvent.click(nextButton);
  userEvent.click(nextButton);

  // let map = wrapper.container.querySelector("#map");
  // expect(map).not.toBeInTheDocument();

  const lastSectionNextButton = screen.queryByText("Next");
  expect(lastSectionNextButton).not.toBeInTheDocument();

  const finishButton = screen.getByText("Finish");
  act(() => userEvent.click(finishButton));

  const backdrop = wrapper.container.querySelector("#loading-backdrop").style;
  expect(backdrop).toHaveProperty("opacity", "1");

  // await new Promise((r) => setTimeout(r, 4000));
  // map = wrapper.container.querySelector("#map");
  // expect(map).toBeInTheDocument();
});

test("Check map renders after data upload", async () => {
  const wrapper = render(
    <Provider>
      <App />
    </Provider>
  );

  userEvent.click(screen.getByText("Upload csv file"));
  const nextButton = screen.getByText("Next");
  userEvent.click(nextButton);
  userEvent.click(nextButton);

  let map = wrapper.container.querySelector("#map");
  expect(map).not.toBeInTheDocument();

  const finishButton = screen.getByText("Finish");
  act(() => userEvent.click(finishButton));

  await new Promise((r) => setTimeout(r, 4000));
  map = wrapper.container.querySelector("#map");
  expect(map).toBeInTheDocument();
});

import React from "react";
import { shallow } from "enzyme";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { Provider } from "../context/CsvDataContext";

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

import * as React from "react";

import classes from "./App.module.scss";
import ReadCsv from "./components/ReadCsv";
import Map from "./components/Map";
import Backdrop from "./components/Backdrop";

import { Context as CsvDataContext } from "./context/CsvDataContext";

const App = () => {
  const { state } = React.useContext(CsvDataContext);
  return (
    <div className={classes.container}>
      <ReadCsv />
      <Map />
      <Backdrop open={state.isLoading} />
    </div>
  );
};

export default App;

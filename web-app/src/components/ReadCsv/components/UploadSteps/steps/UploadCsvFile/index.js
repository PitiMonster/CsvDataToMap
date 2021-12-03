import * as React from "react";
import CSVReader from "react-csv-reader";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Context as CsvDataContext } from "../../../../../../context/CsvDataContext";

const papaparseOptions = {
  dynamicTyping: true,
  skipEmptyLines: true,
};

const UploadCsvFile = () => {
  const { setCsvData } = React.useContext(CsvDataContext);

  const handleReadCsv = (data, fileInfo) => {
    setCsvData(data.slice(0, 20));
  };

  const handleButtonAction = () => {
    document.getElementById("read-csv-input").click();
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CSVReader
        cssClass="react-csv-input"
        label=""
        onFileLoaded={handleReadCsv}
        parserOptions={papaparseOptions}
        inputStyle={{ display: "none" }}
        inputId="read-csv-input"
      />
      <Button variant="outlined" onClick={handleButtonAction}>
        Read csv file
      </Button>
    </Box>
  );
};

export default UploadCsvFile;

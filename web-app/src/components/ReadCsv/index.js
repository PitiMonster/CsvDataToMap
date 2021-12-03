import * as React from "react";

import classes from "./index.module.scss";
import CSVReader from "react-csv-reader";
import Button from "@mui/material/Button";
import { Context as CsvDataContext } from "../../context/CsvDataContext";
import UploadModal from "./components/UploadModal";

const ReadCsv = () => {
  const { setCsvData } = React.useContext(CsvDataContext);

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const handleButtonAction = () => {
    // document.getElementById("read-csv-input").click();
    setIsUploadModalOpen(true);
  };

  return (
    <div className={classes.container}>
      <Button variant="outlined" onClick={handleButtonAction}>
        Upload csv file
      </Button>
      <UploadModal open={isUploadModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default ReadCsv;

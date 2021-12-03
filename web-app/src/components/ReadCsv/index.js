import * as React from "react";

import classes from "./index.module.scss";
import Button from "@mui/material/Button";
import UploadModal from "./components/UploadModal";

const ReadCsv = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const handleButtonAction = () => {
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

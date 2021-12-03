import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CustomBackdrop = ({ open = false }) => {
  return (
    <Backdrop
      sx={{ color: "#1876D2", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => {}}
      id="loading-backdrop"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomBackdrop;

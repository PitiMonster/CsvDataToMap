import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import UploadSteps from "../UploadSteps";

import { Context as CsvDataContext } from "../../../../context/CsvDataContext";

const steps = [
  "Data type information",
  "Upload file",
  "Enter the order of the data",
];

const UploadModal = ({ open, handleClose }) => {
  const { state, setCoordinates } = React.useContext(CsvDataContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = React.useCallback(
    (step) => {
      return skipped.has(step);
    },
    [skipped]
  );

  const handleNext = React.useCallback(
    (step) => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);

      if (step === 2) {
        setCoordinates(state.csvData, state.typesOrder);
        handleClose();
        setActiveStep(0);
      }
    },
    [
      activeStep,
      handleClose,
      isStepSkipped,
      setCoordinates,
      skipped,
      state.csvData,
      state.typesOrder,
    ]
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextBtnDisabled = React.useCallback(
    (step) => {
      if (step === 1) {
        return !!!state.csvData.length;
      }
      return false;
    },
    [state.csvData.length]
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <UploadSteps step={activeStep + 1} />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={() => handleNext(activeStep)}
              disabled={handleNextBtnDisabled(activeStep)}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    </Modal>
  );
};

export default UploadModal;

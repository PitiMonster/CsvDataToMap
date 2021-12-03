import * as React from "react";

import DataTypeInfo from "./steps/DataTypeInfo";
import UploadCsvFile from "./steps/UploadCsvFile";
import ChooseOrderOfData from "./steps/ChooseOrderOfData";

const UploadSteps = ({ step }) => {
  const SelectStep = () => {
    switch (step) {
      case 1:
        return <DataTypeInfo />;
      case 2:
        return <UploadCsvFile />;
      case 3:
        return <ChooseOrderOfData />;
      default:
        return <></>;
    }
  };

  return <SelectStep />;
};

export default UploadSteps;

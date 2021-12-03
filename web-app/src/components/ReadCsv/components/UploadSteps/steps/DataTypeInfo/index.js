import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DataTypeInfo = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
      <Typography>
        Make sure your csv file has 5 columns and contains data such as: city,
        state, zip, address, category
      </Typography>
      <Typography>
        Correct address format: building number street. Example: 1600
        Pennsylvania Ave
      </Typography>
    </Box>
  );
};

export default DataTypeInfo;

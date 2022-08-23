import { Box, styled } from "@mui/material";


export const CustomBox = styled(Box)`
  position: absolute;
  top: 50%,
  left: 50%,
  transform: translate(-50%, -50%),
  width: 400,
  background-color: background.paper,
  border: 2px solid #000,
  box-shadow: 24,
  p: 4,
`;
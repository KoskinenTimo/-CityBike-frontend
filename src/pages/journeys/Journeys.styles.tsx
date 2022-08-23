import { Button, styled } from "@mui/material";
import { parseHexColorToRGBA } from "../../common/functions";


export const OpenFormButton = styled(Button)`
  background-color: ${({theme}) => theme.palette.secondary.dark};
  height: 54px;
  border-radius: 20px;
  padding: 25px;
  &:hover {
    background-color: ${({theme}) => theme.palette.secondary.light}
  }
  &:active {
    background-color: ${({theme}) => 
      parseHexColorToRGBA(theme.palette.secondary.light,0.6)}
  }
`;
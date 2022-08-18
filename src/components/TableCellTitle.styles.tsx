import { styled as MUIstyled, TableCell } from "@mui/material";
import styled from "styled-components";

export const CustomTableCell = MUIstyled(TableCell)`
  top: 57;
  width: 100%;
  height: 100%;
  font-size: 1em;
  &.active {
    background-color: ${({theme}) => theme.palette.secondary.light};
    font-weight: bold;
    color: ${({theme}) => theme.palette.secondary.dark};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const ColumnTitleWrapper = styled.div`
  opacity: 1;
  display: flex;
`;
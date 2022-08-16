import React from "react";
import { TableCell, useTheme } from "@mui/material";
import { TableCellProps } from "../common/types";
import { ChevronDownIcon, ChevronUpIcon } from "../common/icons";
import { ColumnTitleWrapper, CustomTableCell } from "./TableCellTitle.styles";

export const TableCellTitle = ({ text }: TableCellProps) => {
  const theme = useTheme();

  return (
  <CustomTableCell align={"left"} >
    <ColumnTitleWrapper>
    {text}
    <ChevronUpIcon
      size={{ width:"15px", height:"15px"}}
      style={{ color: theme.palette.secondary.dark, padding: "5px", marginLeft: "5px" }}/>
    <ChevronDownIcon
      size={{ width:"15px", height:"15px"}}
      style={{ color: theme.palette.secondary.dark, padding: "5px", marginLeft: "5px" }}/>
    </ColumnTitleWrapper>

  </CustomTableCell>
)};
import React from "react";
import { TableCell } from "@mui/material";
import { TableCellValueProps } from "../common/types";


export const TableCellValue = ({ text }: TableCellValueProps) => (
  <TableCell align={"left"}>
    {text}
  </TableCell>
);
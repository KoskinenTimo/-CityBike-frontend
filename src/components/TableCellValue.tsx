import React from "react";
import { TableCell } from "@mui/material";
import { TableCellProps } from "../common/types";


export const TableCellValue = ({ text }: TableCellProps) => (
  <TableCell align={"right"}>
    {text}
  </TableCell>
);
import React from "react";
import { TableCell } from "@mui/material";
import { TableCellProps } from "../common/types";


export const TableCellTitle = ({ text }: TableCellProps) => (
  <TableCell
    align={"right"}
    style={{ top: 57, minWidth: 80 }}
  >
    {text}
  </TableCell>
);
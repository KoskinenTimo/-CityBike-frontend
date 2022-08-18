import React from "react";
import { LoadingIcon } from "../common/icons";
import { TableLoadingIconWrapper } from "./TableSpinner.styles";

export type TableSpinnerProps = {
  colSpan: number,
}

export const TableSpinner = ({ colSpan }:TableSpinnerProps) => (
  <tr>
    <TableLoadingIconWrapper colSpan={colSpan}>
      <LoadingIcon
        style={{ position: "absolute", top: "50%" }}
        size={{ height: "50px", width: "50px" }}
      />
    </TableLoadingIconWrapper>
  </tr>
);
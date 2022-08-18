import React from "react";
import { useTheme } from "@mui/material";
import { Order, TableCellTitleProps } from "../common/types";
import { ChevronDownIcon, ChevronUpIcon } from "../common/icons";
import { ColumnTitleWrapper, CustomTableCell } from "./TableCellTitle.styles";

export const TableCellTitle = ({ text, sorting, setSorting }: TableCellTitleProps) => {
  const theme = useTheme();
  const isThisColumnTheSortingColumn = text.toLowerCase() === sorting.columnName.toLowerCase();
  const isAscendingOrder = sorting.order === Order.Ascending;
  const isDescendingOrder = sorting.order === Order.Descending;

  const handleColumnTitleClick = (columnText:string) => {
    const isAlreadySortingColumn = sorting.columnName === columnText;
    const isAscendingOrder = sorting.order === Order.Ascending;
    const isDescendingOrder = sorting.order === Order.Descending;

    if(isAlreadySortingColumn && isAscendingOrder) {
      setSorting(prevState => ({ ...prevState, order: Order.Descending }));
    }
    if(isAlreadySortingColumn && isDescendingOrder) {
      setSorting(prevState => ({ ...prevState, order: Order.Ascending }));
    }
    if(!isAlreadySortingColumn) {
      setSorting({ order: Order.Ascending, columnName: columnText });
    }
  };

  return (
    <CustomTableCell
      align={"left"}
      className={isThisColumnTheSortingColumn ? "active" : ""}
      onClick={() => handleColumnTitleClick(text)}
      
    >
      <ColumnTitleWrapper>
        {text}
        {(isThisColumnTheSortingColumn && isDescendingOrder) &&
          <ChevronUpIcon
            size={{ width:"20px", height:"20px"}}
            style={{ color: theme.palette.secondary.dark, padding: "2px", marginLeft: "5px" }}/>
        }
        {(isThisColumnTheSortingColumn && isAscendingOrder) &&
          <ChevronDownIcon
            size={{ width:"20px", height:"20px"}}
            style={{ color: theme.palette.secondary.dark, padding: "2px", marginLeft: "5px" }}/>
        }
      </ColumnTitleWrapper>
    </CustomTableCell>
  );
};
import { TableRow } from '@mui/material';
import React from 'react';
import { TableTitlesProps } from '../common/types';
import { TableCellTitle } from './TableCellTitle';


export const TableTitles = ({ titles=[],sorting,handleClick }: TableTitlesProps) => (
  <TableRow>
    {titles.map(title => (
      <TableCellTitle
        key={title}
        text={title}
        sorting={sorting}
        handleClick={handleClick} />
    ))}
  </TableRow>
);
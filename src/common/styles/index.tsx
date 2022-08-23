import {
  Paper,
  styled,
  Table,
  TableContainer,
  TextField
} from "@mui/material";

export const ListFilterField = styled(TextField)`
  width: 400px;
  margin-bottom: 2em;
  margin-right: 1.5em;
`;

export const CustomPaper = styled(Paper)`
  width: 100%;
`;

export const CustomTableContainer = styled(TableContainer)`
  height: 60vh;
`;

export const CustomTable = styled(Table)`
  table-layout: fixed;
`;
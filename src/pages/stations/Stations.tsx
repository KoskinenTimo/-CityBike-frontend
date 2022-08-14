import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Filter, Page, Rows, StationsResponsePage } from "../../common/types";
import { getStations } from "../../services/stationsService";
import { StationsTextField } from "./Stations.styles";
import { TableCellValue } from "../../components/TableCellValue";
import { TableCellTitle } from "../../components/TableCellTitle";
import { useNavigate } from "react-router-dom";

const Stations = () => {
  const [stationsPage, setStationsPage] = useState({} as StationsResponsePage);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Stations";
  }, []);

  useEffect(() => {
    fetchStations();
  },[]);

  
  useEffect(() => {
    fetchStations(page,rowsPerPage,filter);
  },[page,rowsPerPage,filter]);

  const fetchStations = (
    page: Page = null,
    rowsPerPage: Rows = null,
    filter: Filter = null
    ) => {
    getStations(page,rowsPerPage,filter)
      .then(res => setStationsPage(res.data))
      .catch(err => console.error(err));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Typography 
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
      >
        Stations
      </Typography>
      <StationsTextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleFilterInput} value={filter}
        color={"secondary"}      
      />
      <Paper sx={{ width: '100%' }}>
        <TableContainer style={{ height: "60vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Station
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCellTitle text={"Nimi"} />
                <TableCellTitle text={"Namn"} />
                <TableCellTitle text={"Name"} />
                <TableCellTitle text={"Osoite"} />
                <TableCellTitle text={"Adress"} />
                <TableCellTitle text={"Kapasiteetti"} />
              </TableRow>
            </TableHead>
            <TableBody>
              {(stationsPage.content && stationsPage.content.length) && stationsPage.content
                .map(station => {
                  return (
                    
                      <TableRow hover onClick={() => navigate(`/stations/${station.identifier}`)} role="checkbox" tabIndex={1} key={station.id}>
                        <TableCellValue text={station.nimi} />
                        <TableCellValue text={station.namn} />
                        <TableCellValue text={station.name} />
                        <TableCellValue text={station.osoite} />
                        <TableCellValue text={station.adress} />
                        <TableCellValue text={station.kapasiteetit} />
                      </TableRow>
                    
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={stationsPage.totalElements ? stationsPage.totalElements : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper></>
  );
};

export default Stations;
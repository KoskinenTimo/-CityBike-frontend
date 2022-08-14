import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Filter, Page, Rows, StationsResponsePage } from "../../common/types";
import { getStations } from "../../services/stationsService";
import { StationsTextField } from "./Stations.styles";

const Stations = () => {
  const [stationsPage, setStationsPage] = useState({} as StationsResponsePage);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.document.title = "Stations"
  }, [])

  useEffect(() => {
    fetchStations()
  },[])

  
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
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

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
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Nimi"}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Namn"}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Name"}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Osoite"}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Adress"}
                </TableCell>
                <TableCell
                  align={"right"}
                  style={{ top: 57, minWidth: 80 }}
                >
                  {"Kapasiteetti"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(stationsPage.content && stationsPage.content.length) && stationsPage.content
                .map(station => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={1} key={station.id}>

                      <TableCell align={"right"}>
                        {station.nimi}
                      </TableCell>
                      <TableCell align={"right"}>
                        {station.namn}
                      </TableCell>
                      <TableCell align={"right"}>
                        {station.name}
                      </TableCell>
                      <TableCell align={"right"}>
                        {station.osoite}
                      </TableCell>
                      <TableCell align={"right"}>
                        {station.adress}
                      </TableCell>
                      <TableCell align={"right"}>
                        {station.kapasiteetit}
                      </TableCell>

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
}

export default Stations;
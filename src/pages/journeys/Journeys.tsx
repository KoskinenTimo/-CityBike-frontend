import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Filter, GetJourneyProps, JourneysResponsePage, Page, Rows } from "../../common/types";
import { TableCellTitle } from "../../components/TableCellTitle";
import { TableCellValue } from "../../components/TableCellValue";
import { getJourneys } from "../../services/journeysService";
import { StationsTextField } from "../stations/Stations.styles";

export type JourneysPageFetchParams = {
  page: number | null,
  journeysPerPage: number | null,
  filter: string | null
}

const Journeys = () => {
  const [journeysPage, setJourneysPage] = useState({} as JourneysResponsePage);
  const [page, setPage] = useState(0);
  const [journeysPerPage, setJourneysPerPage] = useState(20);
  const [filterInput, setFilterInput] = useState('');
  const [filter,setFilter] = useState('');

  useEffect(() => {
    window.document.title = "Stations";
  }, []);

  useEffect(() => {
    fetchJourneys({page,journeysPerPage,filter});
  },[]);
  
  useEffect(() => {
    fetchJourneys({page,journeysPerPage,filter});    
  },[page,journeysPerPage,filter]);

  useEffect(() => {
    if (filterInput.length > 2) {
      setFilter(filterInput);
    } else {
      setFilter('');
    }
  },[filterInput]);

  const fetchJourneys = async (
    { page, journeysPerPage, filter }: JourneysPageFetchParams
    ) => {
      try {        
        const res = await getJourneys({
          page,
          journeysPerPage,
          filter,
          departureStationId: null,
          returnStationId: null
        });
        setJourneysPage(res.data);
      } catch (error) {
        console.error(error);
      }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJourneysPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
      >
        Journeys
      </Typography>
      <StationsTextField
        id="outlined-basic"
        label="Name"
        placeholder="Atleast 3 characters"
        variant="outlined"
        onChange={handleFilterInput} value={filterInput}
        color={"secondary"}      
      />
      <Paper sx={{ width: '100%' }}>
        <TableContainer style={{ maxHeight: "60vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell align="center" colSpan={2}>
                  Stations
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Details
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCellTitle text={"Departure station"} />
                <TableCellTitle text={"Return station"} />
                <TableCellTitle text={"Duration (min)"} />
                <TableCellTitle text={"Distance (km)"} />
              </TableRow>
            </TableHead>
            <TableBody>
              {(journeysPage.content && journeysPage.content.length) 
                ? journeysPage.content.map(journey => {                  
                    return (
                      <TableRow hover role="checkbox" tabIndex={1} key={journey.id}>
                        <TableCellValue text={journey.departureStationId?.name} />
                        <TableCellValue text={journey.returnStationId?.name} />
                        <TableCellValue text={Number(journey.duration / 60).toFixed(2)} />
                        <TableCellValue text={journey.distance / 1000} />
                      </TableRow>
                    );
                }) : (
                  <TableRow hover role="checkbox" tabIndex={1}>
                    <TableCellValue text={"No Results"} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={journeysPage.totalElements ? journeysPage.totalElements : 0}
          rowsPerPage={journeysPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper></>
  );
};

export default Journeys;
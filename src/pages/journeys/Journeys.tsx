import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { FormEventHandler, useEffect, useState } from "react";
import { JourneysResponsePage } from "../../common/types";
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
  const [filter,setFilter] = useState('');

  useEffect(() => {
    window.document.title = "Stations";
  }, []);

  useEffect(() => {
    fetchJourneys({page,journeysPerPage,filter});
  },[]);
  
  useEffect(() => {
    fetchJourneys({page,journeysPerPage,filter});    
  },[page,journeysPerPage]);



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

  const handleFilterInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    if (filter.length > 2) {
      await fetchJourneys({ page, journeysPerPage, filter });
      setFilter("");
    }
  };

  return (
    <>
      <Typography
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
      >
        Journeys page
      </Typography>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <StationsTextField
          id="station-name"
          label="Depature station"
          placeholder="Atleast 3 characters"
          variant="outlined"
          onChange={handleFilterInput} value={filter}
          color={"secondary"}      
        />
        <Button color="secondary" style={{fontSize:"1.3em"}} type="submit">Search</Button>
      </form>

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
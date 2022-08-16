import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { padding } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { LoadingIcon } from "../../common/icons";
import {
  FilterParam,
  GetJourneyProps,
  JourneysPerPageParam,
  JourneysResponsePage,
  PageParam
} from "../../common/types";
import { TableCellTitle } from "../../components/TableCellTitle";
import { TableCellValue } from "../../components/TableCellValue";
import { getJourneys } from "../../services/journeysService";
import { StationsTextField } from "../stations/Stations.styles";
import { TableLoadingIconWrapper } from "./Journeys.styles";

export type JourneysPageFetchParams = {
  page: number | null,
  journeysPerPage: number | null,
  filter: string | null
}

export type JourneyFilterParams = PageParam | JourneysPerPageParam | FilterParam;

const Journeys = () => {
  const [queryParams,setQueryParams] = useState({
    page: 0,
    journeysPerPage: 20,
    filter: "",
    departureStationId: null,
    returnStationId: null
  } as GetJourneyProps);  

  useEffect(() => {
    window.document.title = "Stations";
  }, []);

  useEffect(() => {
    fetchJourneys();
  },[
    queryParams.journeysPerPage,
    queryParams.page,
    queryParams.filter
  ]);

  const {
    data:journeysPage,
    refetch:fetchJourneys,
    isLoading, isFetching
  } = useQuery(
    ["journeys"],
    ({ signal }) => getJourneys(queryParams,signal),
    {
      enabled: false,
    }
  );

  const handleSetQueryParams = (newProperties: GetJourneyProps) => {
    setQueryParams(newProperties);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    handleSetQueryParams({ ...queryParams, page: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetQueryParams({ ...queryParams, journeysPerPage: +event.target.value });
  };

  const handleFilterInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetQueryParams({ ...queryParams, page: 0, filter: event.target.value });
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
      <StationsTextField
        id="station-name"
        label="Depature station"
        placeholder="Atleast 3 characters"
        variant="outlined"
        onChange={handleFilterInput} value={queryParams.filter}
        color={"secondary"}      
      />
      {(isFetching && !!queryParams.filter?.length) &&
        <LoadingIcon style={{ padding: ".8em" }} size={{ height: "30px", width: "30px"}}/>
      }

      <Paper sx={{ width: '100%' }}>
        <TableContainer style={{ maxHeight: "60vh"}}>
          {isLoading 
            ?
            <TableLoadingIconWrapper>
              <LoadingIcon style={{ margin: "auto" }} size={{ height: "50px", width: "50px" }}/>
            </TableLoadingIconWrapper>
            :
          
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
                {(!isLoading && journeysPage?.content?.length) &&
                  journeysPage?.content.map(journey => {                  
                        return (
                          <TableRow hover role="checkbox" tabIndex={1} key={journey.id}>
                            <TableCellValue text={journey.departureStationId?.name} />
                            <TableCellValue text={journey.returnStationId?.name} />
                            <TableCellValue text={Number(journey.duration / 60).toFixed(2)} />
                            <TableCellValue text={journey.distance / 1000} />
                          </TableRow>
                        );
                    })}
                {(!isLoading && !isFetching && !journeysPage?.content?.length) &&
                  <TableRow hover role="checkbox" tabIndex={1}>
                    <TableCellValue text={"No Results"} />
                  </TableRow>}
              </TableBody>
            </Table>
          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={journeysPage?.totalElements ? journeysPage?.totalElements : 0}
          rowsPerPage={queryParams.journeysPerPage ? queryParams.journeysPerPage : 0}
          page={queryParams.page ? queryParams.page : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </>
  );
};

export default Journeys;
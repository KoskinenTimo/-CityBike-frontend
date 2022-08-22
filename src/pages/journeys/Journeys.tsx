import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography 
} from "@mui/material";
import {
  GetJourneyProps,
  Journey,
  ColumnOrder,
  Order,
  JourneyTableTitles
} from "../../common/types";
import { LoadingIcon } from "../../common/icons";
import { TableCellValue } from "../../components/TableCellValue";
import { getJourneys } from "../../services/journeysService";
import { compareNumbers, compareStrings } from "../../common/functions";
import { TableTitles } from "../../components/TableTitles";
import { TableSpinner } from "../../components/TableSpinner";
import { CustomPaper, CustomTable, CustomTableContainer, ListFilterField } from "../../common/styles";

export type JourneysPageFetchParams = {
  page: number | null,
  journeysPerPage: number | null,
  filter: string | null
}

const Journeys = () => {
  const [ journeyList, setJourneyList ] = useState<Journey[]>([]);
  const [ sorting, setSorting ] = useState<ColumnOrder>({
    columnName: JourneyTableTitles.DepartureStation,
    order: Order.Ascending
  });
  const [ queryParams, setQueryParams ] = useState({
    page: 0,
    journeysPerPage: 20,
    filter: "",
    departureStationId: null,
    returnStationId: null
  } as GetJourneyProps);  

  useEffect(() => {
    window.document.title = "Journeys";
  }, []);

  const {
    data:journeysPage,
    refetch:fetchJourneys,
    isLoading, isFetching
  } = useQuery(
    ["journeys"],
    ({ signal }) =>  getJourneys(queryParams, signal),
    { enabled: false, }
  );

  useEffect(() => {
    if (!journeysPage?.content?.length) {
      const emptyArray = [] as Journey[];
      setJourneyList(emptyArray);
    } else {
      const journeys = journeysPage.content;
      console.log(journeys);
      
      const sortedJourneys = handleSortingJourneysByChosenColumn(journeys);
      setJourneyList(() => ([ ...sortedJourneys ]));
    }
  },[journeysPage,sorting]);

  useEffect(() => {  
    fetchJourneys();  
  },[queryParams]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setQueryParams(prevState => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prevState => ({ ...prevState, journeysPerPage: +event.target.value }));
  };

  const handleFilterInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prevState => ({ ...prevState, page: 0, filter: event.target.value }));
  };

  const handleSortingJourneysByChosenColumn = (journeys: Journey[]): Journey[] => {
    if (sorting.columnName === JourneyTableTitles.DepartureStation) {
      journeys.sort((a,b) => {
        return compareStrings(
          a.departureStation.name,
          b.departureStation.name,
          sorting.order);
      });
    }
    if (sorting.columnName === JourneyTableTitles.ReturnStation) {
      journeys.sort((a,b) => {
        return compareStrings(
          a.returnStation.name,
          b.returnStation.name,
          sorting.order);
      });
    }
    if (sorting.columnName === JourneyTableTitles.Duration) {
      journeys.sort((a,b) => {
        return compareNumbers(
          a.duration,
          b.duration,
          sorting.order);
      });
    }
    if (sorting.columnName === JourneyTableTitles.Distance) {
      journeys.sort((a,b) => {
        return compareNumbers(
          a.distance,
          b.distance,
          sorting.order);
      });
    }
    return journeys;
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
      <ListFilterField
        id="station-name"
        label="Depature station"
        variant="outlined"
        onChange={handleFilterInput} value={queryParams.filter}
        color={"secondary"}
      />
      {(isFetching && !!queryParams.filter?.length) &&
        <LoadingIcon style={{ padding: ".8em" }} size={{ height: "30px", width: "30px"}}/>
      }

      <CustomPaper>
        <CustomTableContainer>
          <CustomTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Stations
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Details
                </TableCell>
              </TableRow>
              <TableTitles
                titles={Object.values(JourneyTableTitles)}
                setSorting={setSorting}
                sorting={sorting} 
              />
            </TableHead>
            <TableBody>
              {isLoading 
              ?
                <TableSpinner colSpan={4} />
              :
                journeyList.map(journey => {                  
                    return (
                      <TableRow hover role="checkbox" tabIndex={1} key={journey.id}>
                        <TableCellValue text={journey.departureStation?.name} />
                        <TableCellValue text={journey.returnStation?.name} />
                        <TableCellValue text={(journey.duration / 60).toFixed(2)} />
                        <TableCellValue text={(journey.distance / 1000).toFixed(3)} />
                      </TableRow>
                    );
                  }
                )
              }
              {(!isLoading && !isFetching && !journeyList.length) &&
                <TableRow hover role="checkbox" tabIndex={1}>
                  <TableCellValue text={"No Results"} />
                </TableRow>}
            </TableBody>
          </CustomTable>
        
        </CustomTableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={journeysPage?.totalElements ? journeysPage?.totalElements : 0}
          rowsPerPage={queryParams.journeysPerPage ? queryParams.journeysPerPage : 0}
          page={
            (
              queryParams.page &&
              !!journeysPage?.totalElements &&
              journeysPage?.totalElements > 0
            ) 
            ? queryParams.page : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />

      </CustomPaper>
    </>
  );
};

export default Journeys;
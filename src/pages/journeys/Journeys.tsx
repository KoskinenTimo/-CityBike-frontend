import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { LoadingIcon } from "../../common/icons";
import {
  FilterParam,
  GetJourneyProps,
  JourneysPerPageParam,
  PageParam,
  Journey,
  ColumnOrder,
  Order,
  JourneyTableTitles
} from "../../common/types";
import { TableCellTitle } from "../../components/TableCellTitle";
import { TableCellValue } from "../../components/TableCellValue";
import { getJourneys } from "../../services/journeysService";
import { StationsTextField } from "../stations/Stations.styles";
import { TableLoadingIconWrapper } from "./Journeys.styles";
import { compareNumbers, compareStrings } from "../../common/functions";

export type JourneysPageFetchParams = {
  page: number | null,
  journeysPerPage: number | null,
  filter: string | null
}

export type JourneyFilterParams = PageParam | JourneysPerPageParam | FilterParam;


const Journeys = () => {
  const [ journeyList, setJourneyList ] = useState<Journey[]>([]);
  const [ sorting, setSorting ] = useState<ColumnOrder>({
    columnName: JourneyTableTitles.DepartureStation,
    order: Order.Ascending
  });
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

  const {
    data:journeysPage,
    refetch:fetchJourneys,
    isLoading, isFetching
  } = useQuery(
    ["journeys",queryParams], ({ signal }) =>  getJourneys(queryParams, signal),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!journeysPage?.content?.length) {
      const emptyArray = [] as Journey[];
      setJourneyList(emptyArray);
    } else {
      const journeys = journeysPage.content;
      const sortedJourneys = handleSortingJourneysByChosenColumn(journeys);
      setJourneyList(() => ([...sortedJourneys]));
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
          a.departureStationId.name,
          b.departureStationId.name,
          sorting.order);
      });
    }

    if (sorting.columnName === JourneyTableTitles.ReturnStation) {
      journeys.sort((a,b) => {
        return compareStrings(
          a.returnStationId.name,
          b.returnStationId.name,
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
        variant="outlined"
        onChange={handleFilterInput} value={queryParams.filter}
        color={"secondary"}
        style={{ marginBottom: "1em" }}    
      />
      {(isFetching && !!queryParams.filter?.length) &&
        <LoadingIcon style={{ padding: ".8em" }} size={{ height: "30px", width: "30px"}}/>
      }

      <Paper sx={{ width: '100%' }}>
        <TableContainer style={{ height: "60vh"}}>
          <Table stickyHeader aria-label="sticky table" style={{ tableLayout: "fixed" }}>
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
                <TableCellTitle
                  text={JourneyTableTitles.DepartureStation}
                  sorting={sorting}
                  handleClick={handleColumnTitleClick}
                />
                <TableCellTitle
                  text={JourneyTableTitles.ReturnStation}
                  sorting={sorting}
                  handleClick={handleColumnTitleClick}
                />
                <TableCellTitle
                  text={JourneyTableTitles.Duration}
                  sorting={sorting}
                  handleClick={handleColumnTitleClick}
                />
                <TableCellTitle
                  text={JourneyTableTitles.Distance}
                  sorting={sorting}
                  handleClick={handleColumnTitleClick}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading 
              ?
                <tr>
                  <TableLoadingIconWrapper colSpan={4}>
                    <LoadingIcon
                      style={{ position: "absolute", top: "50%" }}
                      size={{ height: "50px", width: "50px" }}
                    />
                  </TableLoadingIconWrapper>
                </tr>
              :
                journeyList.map(journey => {                  
                    return (
                      <TableRow hover role="checkbox" tabIndex={1} key={journey.id}>
                        <TableCellValue text={journey.departureStationId?.name} />
                        <TableCellValue text={journey.returnStationId?.name} />
                        <TableCellValue text={Number(journey.duration / 60).toFixed(2)} />
                        <TableCellValue text={journey.distance / 1000} />
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
          </Table>
        
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={journeysPage?.totalElements ? journeysPage?.totalElements : 0}
          rowsPerPage={queryParams.journeysPerPage ? queryParams.journeysPerPage : 0}
          page={(queryParams.page && !!journeysPage?.totalElements && journeysPage?.totalElements > 0) ? queryParams.page : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </>
  );
};

export default Journeys;
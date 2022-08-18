import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ColumnOrder,
  GetStationsProps,
  Order,
  Station,
  StationTableTitles
} from "../../common/types";
import { getStations } from "../../services/stationsService";
import { TableCellValue } from "../../components/TableCellValue";
import { TableTitles } from "../../components/TableTitles";
import { TableSpinner } from "../../components/TableSpinner";
import { compareNumbers, compareStrings } from "../../common/functions";
import { CustomPaper, CustomTable, CustomTableContainer, ListFilterField } from "../../common/styles";

const Stations = () => {
  const [ stationsList, setStationsList ] = useState<Station[]>([]);
  const [queryParams, setQueryParams] = useState({
    page: 0,
    stationsPerPage: 20,
    filter: "",
  } as GetStationsProps);
  const [ sorting, setSorting ] = useState<ColumnOrder>({
    columnName: StationTableTitles.Nimi,
    order: Order.Ascending
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Stations";
  }, []);

  const {
    data: stationsPage,
    refetch:fetchStations,
    isLoading
  } = useQuery(
    ["stations"],
    ({ signal }) => getStations(queryParams, signal),
    { enabled: false }
  );

  useEffect(() => {
    if (!stationsPage?.content?.length) {
      const emptyArray = [] as Station[];
      setStationsList(emptyArray);
    } else {
      const stations = stationsPage.content;
      const sortedStations = handleSortingStationsByChosenColumn(stations);
      setStationsList(() => ([ ...sortedStations ]));
    }
  },[stationsPage,sorting]);

  useEffect(() => {
    fetchStations();
  },[queryParams]);


  const handleChangePage = (event: unknown, newPage: number) => {
    setQueryParams(prevState => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prevState => ({ ...prevState, stationsPerPage: +event.target.value }));
  };

  const handleFilterInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prevState => ({ ...prevState, page: 0, filter: event.target.value }));
  };

  const handleSortingStationsByChosenColumn = (stations: Station[]): Station[] => {
    if (sorting.columnName === StationTableTitles.Nimi) {
      stations.sort((a,b) => {
        return compareStrings(a.nimi, b.nimi, sorting.order);
      });
    }
    if (sorting.columnName === StationTableTitles.Namn) {
      stations.sort((a,b) => {
        return compareStrings(a.namn, b.namn, sorting.order);
      });
    }
    if (sorting.columnName === StationTableTitles.Name) {
      stations.sort((a,b) => {
        return compareStrings(a.name, b.name, sorting.order);
      });
    }
    if (sorting.columnName === StationTableTitles.Osoite) {
      stations.sort((a,b) => {
        return compareStrings(a.osoite, b.osoite, sorting.order);
      });
    }
    if (sorting.columnName === StationTableTitles.Adress) {
      stations.sort((a,b) => {
        return compareStrings(a.adress, b.adress, sorting.order);
      });
    }
    if (sorting.columnName === StationTableTitles.Capacity) {
      stations.sort((a,b) => {
        return compareNumbers(a.kapasiteetit, b.kapasiteetit, sorting.order);
      });
    }
    return stations;
  };

  return (
    <>
      <Typography 
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
      >
        Stations page
      </Typography>
      <ListFilterField
        id="station-name"
        label="Name"
        variant="outlined"
        onChange={handleFilterInput} value={queryParams.filter}
        color={"secondary"}      
      />
      <CustomPaper>
        <CustomTableContainer>
          <CustomTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Station
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
              <TableTitles
                titles={Object.values(StationTableTitles)}
                setSorting={setSorting}
                sorting={sorting} 
              />
            </TableHead>
            <TableBody>
              {isLoading
              ?
                <TableSpinner colSpan={6} />
              :
                stationsList
                  .map(station => (
                    <TableRow 
                      hover
                      onClick={() => navigate(`/stations/${station.identifier}`)}
                      role="checkbox" tabIndex={1}
                      key={station.id}
                    >
                      <TableCellValue text={station.nimi}/>
                      <TableCellValue text={station.namn} />
                      <TableCellValue text={station.name} />
                      <TableCellValue text={station.osoite} />
                      <TableCellValue text={station.adress} />
                      <TableCellValue text={station.kapasiteetit} />
                    </TableRow>
                  )
                )
              }
            </TableBody>
          </CustomTable>
        </CustomTableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={stationsPage?.totalElements ? stationsPage.totalElements : 0}
          rowsPerPage={queryParams.stationsPerPage ? queryParams.stationsPerPage : 0}
          page={
            (
              queryParams.page &&
              !!stationsPage?.totalElements &&
              stationsPage?.totalElements > 0
            ) 
            ? queryParams.page : 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </CustomPaper>
    </>
  );
};

export default Stations;
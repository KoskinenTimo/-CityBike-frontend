import { Filter, Page, Rows, Station, StationsResponsePage } from "../common/types";
import { bikeAppApiClient } from "./bikeAppApiClient";


export const getStations = async (
  page: Page = null,
  stationsPerPage: Rows = null,
  filter: Filter = null
  ) => {    
  return await bikeAppApiClient.get<StationsResponsePage>(
    '/stations',
    { 
      params: {
        ...(page ? { page } : []),
        ...(stationsPerPage ? { stationsPerPage } : []),
        ...(filter ? { filter } : [])
      }
    });
};

export const getOneStation = async (id: number) => {    
  return await bikeAppApiClient.get<Station>(`/stations/${id}`);
};

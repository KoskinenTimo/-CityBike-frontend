import { bikeAppApiClient } from "./bikeAppApiClient";
import { GetStationsProps, Station, StationsResponsePage } from "../common/types";


export const getStations = async ({
    page,
    stationsPerPage,
    filter,
  }: GetStationsProps,
  signal: AbortSignal | undefined
): Promise<StationsResponsePage> => { 

  return await bikeAppApiClient.get(
    '/stations',
    { 
      params: {
        ...(page ? { page } : []),
        ...(stationsPerPage ? { stationsPerPage } : []),
        ...(filter ? { filter } : [])
      },
      signal
    })
    .then(res => res.data);
};

export const getOneStation = async (id: number) => {    
  return await bikeAppApiClient.get<Station>(`/stations/${id}`);
};

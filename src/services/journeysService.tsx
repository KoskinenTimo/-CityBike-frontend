import { GetJourneyProps, JourneysResponsePage } from "../common/types";
import { bikeAppApiClient } from "./bikeAppApiClient";


export const getJourneys = ({
  page,
  journeysPerPage,
  filter,
  departureStationId=null,
  returnStationId=null
  }: GetJourneyProps,
  signal: AbortSignal | undefined
  ): Promise<JourneysResponsePage> => {  
    
    return bikeAppApiClient.get(
      '/journeys',
      { 
        params: {
          ...(page ? { page } : []),
          ...(journeysPerPage ? { journeysPerPage } : []),
          ...(filter ? { filter } : []),
          ...(departureStationId ? { departureStationId } : []),
          ...(returnStationId ? { returnStationId } : []),
        },
        signal
      }).then(res => res.data);
};




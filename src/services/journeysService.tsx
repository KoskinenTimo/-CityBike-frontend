import { GetJourneyProps, JourneysResponsePage } from "../common/types";
import { bikeAppApiClient } from "./bikeAppApiClient";


export const getJourneys = async ({
  page,
  journeysPerPage,
  filter,
  departureStationId=null,
  returnStationId=null
  }: GetJourneyProps) => {
    return await bikeAppApiClient.get<JourneysResponsePage>(
      '/journeys',
      { 
        params: {
          ...(page ? { page } : []),
          ...(journeysPerPage ? { journeysPerPage } : []),
          ...(filter ? { filter } : []),
          ...(departureStationId ? { departureStationId } : []),
          ...(returnStationId ? { returnStationId } : []),
        }
      });
};




import axios from "axios";
import { Filter, JourneysResponsePage, Page, Rows } from "../common/types";

const restaurantsClient = axios.create({
  baseURL: 'http://localhost:8080'
});


export const getJourneys = async (
  page: Page = null,
  journeysPerPage: Rows = null,
  filter: Filter = null
  ) => {
    return await restaurantsClient.get<JourneysResponsePage>(
      '/journeys',
      { 
        params: {
          ...(page ? { page } : []),
          ...(journeysPerPage ? { journeysPerPage } : []),
          ...(filter ? { filter } : [])
        }
      });
};

import axios from "axios"
import { Filter, Page, Rows, StationsResponsePage } from "../common/types"

const restaurantsClient = axios.create({
  baseURL: 'http://localhost:8080'
})


export const getStations = async (
  page: Page = null,
  stationsPerPage: Rows = null,
  filter: Filter = null
  ) => {    
  return await restaurantsClient.get<StationsResponsePage>(
    '/stations',
    { 
      params: {
        ...(page ? { page } : []),
        ...(stationsPerPage ? { stationsPerPage } : []),
        ...(filter ? { filter } : [])
      }
    })
}

export type Page = number | null;
export type Filter = string | null;
export type Rows = number | null;

export type PageParam = {
  page: Page,
}

export type JourneysPerPageParam = {
  journeysPerPage: Rows
}

export type FilterParam = {
  filter: Filter
}

export type Station = {
  id: number,
  identifier: number,
  nimi: string,
  namn: string,
  name: string,
  osoite: string,
  adress: string,
  kaupunki: string,
  stad: string,
  operaattori: string,
  kapasiteetit: number,
  location: {
    id: number,
    latitude: number,
    longitude: number,
    new: boolean
  }
}

export type Journey = {
  id: number,
  departureTimeStamp: number,
  returnTimestamp: number,
  departureStationId: Station
  returnStationId: Station
  distance: number,
  duration: number,
  new: boolean
}

export type ResponsePage = {
  pageable: {
      sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
      },
      pageSize: number,
      pageNumber: number,
      offset: number,
      unpaged: boolean,
      paged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
    },
    numberOfElements: number,
    first: boolean,
    size: number,
    number: number,
    empty: boolean
}

export type StationsResponsePage = ResponsePage & {
  content: Station[]
}

export type JourneysResponsePage = ResponsePage & {
  content: Journey[]
}

export type GetJourneyProps = {
  page: Page,
  journeysPerPage: Rows,
  filter: Filter,
  departureStationId: number | null,
  returnStationId: number | null
}

export type GetStationsProps = {
  page: Page,
  stationsPerPage: Rows,
  filter: Filter
}

export enum Order {
  Ascending = "ascending",
  Descending = "descending"
}

export type ColumnOrder = {
  columnName: string,
  order: Order
}

export type TableCellValueProps = {
  text: string | number
}

export enum JourneyTableTitles {
  DepartureStation = "Departure station",
  ReturnStation = "Return station",
  Duration = "Duration (min)",
  Distance = "Distance (km)"
}

export enum StationTableTitles {
  Nimi = "Nimi",
  Namn = "Namn",
  Name = "Name",
  Osoite = "Osoite",
  Adress = "Adress",
  Capacity = "Capacity"
}

export type TableCellTitleProps = {
  text: string,
  sorting: ColumnOrder,
  setSorting: React.Dispatch<React.SetStateAction<ColumnOrder>>
}

export type TableTitlesProps = {
  titles: string[],
  sorting: ColumnOrder,
  setSorting: React.Dispatch<React.SetStateAction<ColumnOrder>>
}
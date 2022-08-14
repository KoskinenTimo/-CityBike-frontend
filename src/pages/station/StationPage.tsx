import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { StationWrapper } from "./StationPage.styles";
import { useNavigate, useParams } from "react-router-dom";
import { JourneysResponsePage, Station } from "../../common/types";
import { getOneStation } from "../../services/stationsService";
import { CustomStationGrid } from "../../components/CustomStationGrid";
import { getJourneys } from "../../services/journeysService";


const StationPage = () => {
  const { id } = useParams();
  const [station,setStation] = useState({} as Station);
  const [departsPage,setDepartsPage] = useState({} as JourneysResponsePage);
  const [returnsPage,setReturnsPage] = useState({} as JourneysResponsePage);  
  const navigate = useNavigate();
  
  useEffect(() => {
    window.document.title = "Station";
  }, []);
  

  useEffect(() => {
    if(id) {
      fetchStation(Number(id));
      fetchStationDepartures(Number(id));
      fetchStationReturns(Number(id));
    }
  },[id]);



  const fetchStation = (id: number) => {
    getOneStation(id)
      .then(res => setStation(res.data))
      .catch(err => console.error(err));
  };

  const fetchStationDepartures = (id: number) => {
    getJourneys({
      page: null,
      journeysPerPage: null,
      filter: null,
      departureStationId: id,
      returnStationId: null
    })
      .then(res => setDepartsPage(res.data))
      .catch(err => console.error(err));
  };

  const fetchStationReturns = (id: number) => {
    getJourneys({
      page: null,
      journeysPerPage: null,
      filter: null,
      departureStationId: null,
      returnStationId: id
    })
      .then(res => setReturnsPage(res.data))
      .catch(err => console.error(err));
  };

  
  return (
    <StationWrapper>
      <Typography
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
        >
        Station: {station.nimi}/{station.namn}/{station.name}
      </Typography>
      <Grid container rowGap={2} columnGap={1}   style={{backgroundColor:"#fafafa", padding: ".7em"}}>
        <CustomStationGrid text={`Address: ${station.osoite}`} />
        <CustomStationGrid text={`Adress: ${station.adress}`} />
        <CustomStationGrid text={`Departs here: ${departsPage ? departsPage.totalElements : ''}`} />
        <CustomStationGrid text={`Returns here: ${returnsPage ? returnsPage.totalElements : ''}`} />
      </Grid>
      <Button color="secondary" onClick={() => navigate("/stations")}>Go Back</Button>
    </StationWrapper>
  );
};

export default StationPage;
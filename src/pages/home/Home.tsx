import React from "react";
import { Typography } from "@mui/material";
import { HomeWrapper } from "./Home.styles";


const Home = () => {
  return (
    <HomeWrapper>
      <Typography
        variant="h4" 
        gutterBottom component="div"
        color={"secondary"}
      >
        Home
      </Typography>
      <Typography
        variant="body1" 
        gutterBottom component="div"
        color={"secondary"}
      >
        This app uses backend to store and provide data for bike stations and journeys taken between them. You can filter the lists by name input and select how many items you want to see in the list per page. The lists are paginated.
        <br/>
        Project is created for pre assignment and to learn new tech. This is my first app which uses my own built java spring backend.
        <br/>
        Frontend uses MUI components as much as possible and styling is done via styled-components mainly. Some component specific styles have been added when it made sense, in others words only 1 property was changed.
      </Typography>
    </HomeWrapper>
  )
}

export default Home;
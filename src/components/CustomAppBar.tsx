import React from "react";
import { Link } from "react-router-dom";
import { CustomAppBarButton } from "./CustomAppBar.styles";
import { MUIAppBar } from "./MUIAppBar";


const CustomAppBar = () => {
  return (
    <MUIAppBar>
      <Link to={"/"} style={{ color:"white" }}>
        <CustomAppBarButton
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Home
        </CustomAppBarButton>
      </Link>
      <Link to={"/stations"} style={{ color:"white" }}>
        <CustomAppBarButton
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Stations
        </CustomAppBarButton>
      </Link>
      <Link to={"/journeys"} style={{ color:"white" }}>
        <CustomAppBarButton
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Journeys
        </CustomAppBarButton>
      </Link>
    </MUIAppBar>

  )
}

export default CustomAppBar;
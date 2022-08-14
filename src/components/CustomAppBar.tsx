import React from "react";
import { CustomAppBarButton } from "./CustomAppBar.styles";
import { MUIAppBar } from "./MUIAppBar";


const CustomAppBar = () => (
  <MUIAppBar>
    <CustomAppBarButton
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      Home
    </CustomAppBarButton>
    <CustomAppBarButton
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      Stations
    </CustomAppBarButton>
    <CustomAppBarButton
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      Journeys
    </CustomAppBarButton>
  </MUIAppBar>
)

export default CustomAppBar;
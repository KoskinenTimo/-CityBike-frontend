import { useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BicycleIcon } from "../common/icons";
import { CustomAppBarButton } from "./CustomAppBar.styles";
import { MUIAppBar } from "./MUIAppBar";


const CustomAppBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MUIAppBar>
      <BicycleIcon size={{ width:"40px", height:"40px" }} style={{ color: theme.palette.secondary.dark }}/>
        <CustomAppBarButton 
          onClick={() => navigate("/")}
        >
          Home
        </CustomAppBarButton>
        <CustomAppBarButton 
          onClick={() => navigate("/stations")}
        >
          Stations
        </CustomAppBarButton>
        <CustomAppBarButton
          onClick={() => navigate("/journeys")}
        >
          Journeys
        </CustomAppBarButton>
    </MUIAppBar>

  );
};

export default CustomAppBar;
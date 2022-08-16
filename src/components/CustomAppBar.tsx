import { useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BicycleIcon } from "../common/icons";
import { CustomAppBarButton } from "./CustomAppBar.styles";
import { MUIAppBar } from "./MUIAppBar";


const CustomAppBar = () => {
  const styles = useTheme();
  return (
    <MUIAppBar>
      <BicycleIcon size={{ width:"40px", height:"40px" }} style={{ color: styles.palette.secondary.dark }} />
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <CustomAppBarButton
          sx={{ my: 2 }}
          theme={styles}
        >
          Home
        </CustomAppBarButton>
      </Link>
      <Link to={"/stations"} style={{ textDecoration: "none" }}>
        <CustomAppBarButton
          sx={{ my: 2 }}
          theme={styles}
        >
          Stations
        </CustomAppBarButton>
      </Link>
      <Link to={"/journeys"} style={{ textDecoration: "none" }}>
        <CustomAppBarButton
          sx={{ my: 2 }}
          theme={styles}
        >
          Journeys
        </CustomAppBarButton>
      </Link>
    </MUIAppBar>

  );
};

export default CustomAppBar;
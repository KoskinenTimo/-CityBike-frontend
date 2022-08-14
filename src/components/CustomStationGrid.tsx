import { Grid, ListItem, Typography } from "@mui/material";
import React from "react";

export type CustomStationGridProps = {
  text: string
}
export const CustomStationGrid = ({ text }: CustomStationGridProps) => (
  <Grid item xs={5} style={{backgroundColor:"white", margin:"auto"}}>
    <ListItem>
      <Typography
        variant="subtitle1" 
        gutterBottom component="div"
        color={"secondary"}
      >
        {text}
      </Typography>
    </ListItem>
  </Grid>
);
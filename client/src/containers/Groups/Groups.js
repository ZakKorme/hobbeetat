import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useHistory, useLocation } from "react-router-dom";
import authSlice from "../../store/slices/auth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import GroupTable from "../../components/GroupTable/GroupTable";


const Groups = (props) => {
  return (
     <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
          backgroundColor: "#fafafa",
        }}
      >
        <Grid container>
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Grid item xs={8}>
              <Container maxWidth="sm">
                <GroupTable/>
              </Container>
            </Grid>
            <Grid
              item
              xs={2}
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Groups;

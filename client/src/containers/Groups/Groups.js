import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import GroupTable from "../../components/Group/GroupTable/GroupTable";
import UserGroupMenu from "../../components/Group/UserMenu/UserMenu";
import TrendingMenu from "../../components/Group/TrendingMenu/TrendingMenu"
import CreateGroup from "../../components/Group/CreateGroup/CreateGroup";

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
              <Container maxWidth="md">
                <CreateGroup />
                <Container style={{
                  display: "inline-flex",
                  paddingLeft: "0",
                  paddingTop: "2%"
                }}>
                <UserGroupMenu/>
                <TrendingMenu/>
                </Container>
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

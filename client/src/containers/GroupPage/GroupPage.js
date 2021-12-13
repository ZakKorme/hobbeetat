import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


import GroupPageLayout from "../../components/GroupPage/GroupPage";
import GroupPageBar from "../../components/GroupPageBar/GroupPageBar";
import GroupInformation from "../../components/GroupInformation/GroupInformation";
import GroupPagePost from "../../components/GroupPagePost/GroupPagePost";

const GroupPage = (props) => {
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
            spacing={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{paddingLeft: "20%"}}
          >
            <Grid item xs={3}>
              <GroupPageLayout/>
            </Grid>
            <Grid item xs>
              <GroupPageBar/>
              <GroupInformation/>
              <GroupPagePost/>
            </Grid>
            <Grid item xs>
              
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GroupPage;

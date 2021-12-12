import {
  Container,
  Card,
  CardHeader,
  TableContainer,
  Table,
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Pagination
} from "@mui/material";
import { useSelector } from "react-redux";
import classes from "./GroupTable.module.css";

const GroupTable = props => {
  const hobbyState = useSelector(state => state.hobby);

  return (
    <Container>
      <Card style={{ marginTop: "2%" }}>
        <CardHeader
          title={`${hobbyState.currentHobby} Groups`}
          style={{
            paddinLeft: "1.5rem",
            paddingRight: "1.5rem",
            borderTop: "0"
          }}
          titleTypographyProps={{
            component: Box,
            fontSize: "17px",
            color: "#32325d"
          }}
        />
        <TableContainer>
          <Box component={Table} alignItems="center">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    paddinLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    borderTop: "0",
                    verticalAlign: "middle",
                    fontSize: "10.4px",
                    color: "#8898aa",
                    backgroundColor: "#f6f9fc"
                  }}
                >
                  GROUP NAME
                </TableCell>
                <TableCell
                  style={{
                    paddinLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    borderTop: "0",
                    verticalAlign: "middle",
                    fontSize: "10.4px",
                    color: "#8898aa",
                    backgroundColor: "#f6f9fc"
                  }}
                >
                  ACTIVE MEMBERS
                </TableCell>
                <TableCell
                  style={{
                    paddinLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    borderTop: "0",
                    verticalAlign: "middle",
                    fontSize: "10.4px",
                    color: "#8898aa",
                    backgroundColor: "#f6f9fc"
                  }}
                >
                  ELIGIBILITY
                </TableCell>
                <TableCell
                  style={{
                    paddinLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    borderTop: "0",
                    verticalAlign: "middle",
                    fontSize: "10.4px",
                    color: "#8898aa",
                    backgroundColor: "#f6f9fc"
                  }}
                >
                  DATE CREATED
                </TableCell>
                <TableCell
                  style={{
                    paddinLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    borderTop: "0",
                    verticalAlign: "middle",
                    fontSize: "10.4px",
                    color: "#8898aa",
                    backgroundColor: "#f6f9fc"
                  }}
                  align="center"
                >
                  JOIN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hobbyState.groups.map(group => {
                let enrollment_status_text = null;
                switch (group.enrollment_status) {
                  case "O":
                    enrollment_status_text = "Open";
                    break;
                  case "I":
                    enrollment_status_text = "Invite Only";
                    break;
                  default:
                    enrollment_status_text = "Closed";
                }
                return (
                  <TableRow key={group.id}>
                    <TableCell component="th" variant="head" scope="row">
                      {group.name}
                    </TableCell>
                    <TableCell>20,000</TableCell>
                    <TableCell>
                      {enrollment_status_text}
                    </TableCell>
                    <TableCell>07-20-2020</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        component="span"
                        size="small"
                        disabled={
                          enrollment_status_text === "Closed" ? true : false
                        }
                      >
                        {enrollment_status_text === "Invite Only"
                          ? "Request to Join"
                          : "Join"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Box>
        </TableContainer>
        <Box
          style={{
            paddingBottom: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "0",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Pagination count={3} color="primary" small="size" />
        </Box>
      </Card>
    </Container>
  );
};

export default GroupTable;

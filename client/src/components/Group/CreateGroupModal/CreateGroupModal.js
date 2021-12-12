import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  p: 4
};

const CreateGroupModal = props => {
  const [eligibility, setEligibility] = useState(null);

  const handleEligibility = event => {
    setEligibility(event.target.value);
  };

  return (
    <Modal open={props.open}>
      <Card sx={style}>
        <CardHeader
          title="Create a Group"
          action={
            <IconButton
              onClick={() => {
                setEligibility(null);
                props.close();
              }}
            >
              <ClearIcon />
            </IconButton>
          }
        />
        <CardContent
          style={{
            display: "inline-flex",
            flexDirection: "column"
          }}
        >
          <TextField
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
            style={{ paddingBottom: "5%" }}
          />
          <TextField
            id="outlined-basic"
            label="Group Description"
            variant="outlined"
            placeholder="Describe what your group is about.."
            multiline
            rows={4}
            rowsMax={10}
            style={{
              marginBottom: 20,
              minWidth: 350
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Eligibility</InputLabel>
            <Select
              style={{ paddingTop: 0 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={eligibility}
              label="Eligibility"
              onChange={handleEligibility}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"Invite Only"}>Invite Only</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button variant="contained">Create Group</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default CreateGroupModal;

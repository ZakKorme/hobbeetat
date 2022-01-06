import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { withStyles } from "@mui/styles";
import Edit from "@mui/icons-material/Edit";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 50
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    color: "black",
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  btnIcons: {
    marginLeft: 10
  }
});

const EditableTextField = props => {
  const [noteTitle, setNoteTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const classes = styles();
  const value = props.value;

  const handleChange = props.change;

  const handleMouseOver = event => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };

  const handleMouseOut = event => {
    if (mouseOver) {
      setMouseOver(false);
    }
  };

  const handleClick = () => {
    setEditMode(true);
    setMouseOver(false);
  };

  return (
    <div>
      <TextField
        name="Note Title"
        variant="standard"
        defaultValue={value}
        margin="normal"
        // error={value === ""}
        onChange={handleChange}
        disabled={!editMode}
        className={classes.textField}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        InputProps={{
          classes: {
            disabled: classes.disabled
          },
          endAdornment: mouseOver
            ? <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            : ""
        }}
      />
    </div>
  );
};

export default EditableTextField;

import { React, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Button,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditableTextField from "./EditableTextField/EditableTextField";
import DeleteIcon from "@mui/icons-material/Delete";

import noteSlice from "../../store/slices/notes";

const drawerWidth = 400;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));

const NotesSideBar = props => {
  const [open, setOpen] = useState(props.open);
  const [originalSelectedNote, setOriginalSelectedNote] = useState(null);
  const [originalSelectedTitle, setOriginalSelectedTitle] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteTitle, setSelectedNoteTitle] = useState(null);
  const [value, setValue] = useState("");

  const authState = useSelector(state => state.auth);
  const hobbyState = useSelector(state => state.hobby);
  const noteState = useSelector(state => state.note);
  const [notes, setNotes] = useState(noteState.notes ? noteState.notes : null);

  const dispatch = useDispatch();

  const sortByCreatedDate = notes => {
    notes.sort((a, b) => {
      return new Date(a["created_on"]) - new Date(b["created_on"]);
    });
    return notes;
  };
  const handleDrawerClose = () => {
    props.close();
  };

  const handleTitleChange = event => {
    setSelectedNoteTitle(event.target.value);
  };

  const handleSelectedNote = note => {
    setSelectedNote(note);
    setOriginalSelectedNote(note);
    setSelectedNoteTitle(note.title);
    setOriginalSelectedTitle(note.title);
    setValue(note.html);
  };

  const handleChangeNote = () => {
    // Updating note if our values or title changes
    if (
      originalSelectedTitle !== selectedNoteTitle ||
      originalSelectedNote.html !== value
    ) {
      // Notes without modified note
      console.log(notes);
      let noteList = notes.filter(note => note.id !== originalSelectedNote.id);

      const config = {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      };
      axios
        .put(
          `${process.env
            .REACT_APP_API_URL}/auth/notes/${originalSelectedNote.id}/`,
          {
            title: selectedNoteTitle,
            html: value
          },
          config
        )
        .then(res => {
          let updatedNoteList = sortByCreatedDate([...noteList, res.data[0]]);
          dispatch(
            noteSlice.actions.setNotes({
              notes: updatedNoteList
            })
          );
        })
        .catch(err => console.log(err));
    }

    handleClearNote();
  };

  const handleClearNote = () => {
    setSelectedNote(null);
    setOriginalSelectedNote(null);
    setSelectedNoteTitle(null);
    setOriginalSelectedTitle(null);
    setValue(null);
  };

  const handleNewNote = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/notes/`,
        {
          hobby: hobbyState.currentHobby,
          user: authState.account.id,
          title: "New Note",
          html: ""
        },
        config
      )
      .then(res => {
        let newNoteList = sortByCreatedDate([...noteState.notes, res.data]);
        dispatch(
          noteSlice.actions.setNotes({
            notes: newNoteList
          })
        );
      })
      .catch(err => console.log(err));
  };

  const handleDeleteNote = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    };

    const removedNoteList = sortByCreatedDate(
      noteState.notes.filter(note => note.id !== selectedNote.id)
    );
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/auth/notes/${selectedNote.id}`,
        config
      )
      .then(res => {
        dispatch(
          noteSlice.actions.setNotes({
            notes: removedNoteList
          })
        );

        handleClearNote();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {}, [notes, noteState]);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth
        },
        position: "relative",
        zIndex: 1400
      }}
      variant="perminant"
      anchor="right"
      open={open}
    >
      <div />
      <DrawerHeader>
        <IconButton>
          {originalSelectedTitle
            ? <ChevronLeftIcon onClick={handleChangeNote} />
            : <ChevronRightIcon onClick={handleDrawerClose} />}
        </IconButton>
        <div />
        {originalSelectedNote
          ? <div
              className="flex justify-between"
              styles={{
                fontFamily: "sans-serif"
              }}
            >
              <div>
                <EditableTextField
                  value={selectedNoteTitle}
                  change={handleTitleChange}
                />
              </div>
              <div />
              <div className="pt-4 pl-20">
                <IconButton aria-label="delete" onClick={handleDeleteNote}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          : <Button onClick={handleNewNote}>NEW NOTE</Button>}
      </DrawerHeader>
      <Divider />
      {selectedNote
        ? <ReactQuill
            theme="snow"
            defaultValue={value}
            style={{
              height: 250
            }}
            value={value}
            onChange={value => {
              return setValue(value);
            }}
          />
        : <List>
            {noteState.notes
              ? noteState.notes.map((note, index) => {
                  let selectedNote = note;
                  let secondaryText;
                  let modifiedDate = new Date(note["modified_on"])

                  // Format text and remove html tags
                  if (note.html.length > 40) {
                    secondaryText = `${note.html
                      .replace(/<\/?[^>]+(>|$)/g, "")
                      .slice(0, 20)}...`;
                  } else {
                    secondaryText = note.html.replace(/<\/?[^>]+(>|$)/g, "");
                  }
                  return (
                    <>
                    <ListItemButton
                      onClick={() => handleSelectedNote(selectedNote)}
                    >
                      <ListItemText
                        primary={
                          <strong>
                            {selectedNote.title}
                            </strong>}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              
                              {`${modifiedDate.getMonth()+1}/${modifiedDate.getDate()}/${modifiedDate.getFullYear()}`}
                            </Typography>
                            <br/>
                            {secondaryText}
                          </>
                        }
                      />
                    </ListItemButton>
                    {index === notes.length - 1 ? null: <Divider/>}
                    </>
                  );
                })
              : null}
          </List>}
    </Drawer>
  );
};

export default NotesSideBar;

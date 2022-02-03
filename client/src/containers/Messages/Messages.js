import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  ListItem,
  List,
  Box,
  Grid,
  Container,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Paper
} from "@mui/material";
import Search from "../../components/Search/Search";
import { inbox } from "../../utils/inbox";
import { useSelector } from "react-redux";
const Messages = props => {
  const messageState = useSelector(state => state.message);
  const authState = useSelector(state => state.auth);
  const fullName = `${authState.account["first_name"]} ${authState.account[
    "last_name"
  ]}`;
  const inboxMessages = inbox(
    [...messageState.unread, ...messageState.read],
    fullName
  );
  const [messages, setMessages] = useState(inboxMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessageRecepient, setSelectedMessageRecepient] = useState(
    null
  );

  const handleSelectedMessage = (message, recepient) => {
    console.log(message);
    setSelectedMessage(message);
    setSelectedMessageRecepient(recepient);
  };

  const selectedMessageComponent = (
    <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
      <ul class="space-y-1">
        {selectedMessage
          ? selectedMessage[selectedMessageRecepient].map(message => {
              if (authState.account.id !== message.creator.id) {
                return (
                  <li class="flex justify-end">
                    <div class="relative max-w-md px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block">
                        {message.message}
                      </span>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li class="flex justify-start">
                    <div class="relative max-w-md px-4 py-2 text-gray-700 rounded shadow">
                      <span class="block">
                        {message.message}
                      </span>
                    </div>
                  </li>
                );
              }
            })
          : null}
      </ul>
    </div>
  );

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
          backgroundColor: "#fafafa"
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
              <Container
                maxWidth="md"
                style={{
                  paddingTop: "2%",
                  paddingBottom: "100%"
                }}
              >
                <Card
                  elevation={0}
                  style={{
                    display: "flex",
                    whitespace: "0"
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column"
                    }}
                  >
                    <CardHeader title="Messages" />
                    <CardContent style={{}}>
                      <Search />
                      <List dense>
                        {messages.map((message, index) => {
                          let recepient = Object.keys(message)[0];
                          let recentMessage =
                            message[recepient][message[recepient].length - 1]
                              .message;
                          return (
                            <ListItem
                              onClick={() =>
                                handleSelectedMessage(message, recepient)}
                              divider={true}
                              secondaryAction={
                                <ListItemText
                                  secondary={"15 mins"}
                                  secondaryTypographyProps={{
                                    paddingRight: "10%",
                                    fontSize: "13px",
                                    display: "inline-flex",
                                    whiteSpace: "nowrap"
                                  }}
                                />
                              }
                            >
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src="https://www.fillmurray.com/500/900"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={recepient}
                                  secondary={recentMessage}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </CardContent>
                  </div>
                  {/* <div
                    style={{
                      marginTop: "8%",
                      marginBottom: "3%",
                      textAlign: "center"
                    }}
                  > */}
                  {selectedMessage
                    ? <Container
                        maxWidth="sm"
                        style={{
                          paddingTop: "6%",
                          maxWidth: "450px",
                          maxHeight: "50%"
                        }}
                      >
                        {selectedMessage
                          ? selectedMessageComponent
                          : <div style={{ whiteSpace: "0" }}>
                              You have not selected a message
                            </div>}
                      </Container>
                    : null}
                  {/* </div> */}
                </Card>
              </Container>
            </Grid>
            <Grid
              item
              xs={2}
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-start"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Messages;

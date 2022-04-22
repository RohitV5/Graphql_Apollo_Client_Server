
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MSGS } from "../graphql/queries";
import MessageCard from "./MessageCard";

const ChatScreen = () => {
  const { id, name } = useParams();
  debugger
  const { data, loading, error } = useQuery(GET_MSGS, {
    variables: { receiverId: +id },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: 0 }}>
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{ width: "32px", height: "32px", mr: 2 }}
          />
          <Typography variant="h6" color="#000">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        sx={{ overflowY: "auto", flexGrow: 1, padding: "1em" }}
      >
        {loading ? (
          <Typography variant="h6">Loading chats...</Typography>
        ) : (
          data?.messagesByUser.map((message) => (
            <MessageCard
              key={message.createdAt}
              text={message?.text}
              date={new Date(message?.createdAt).toLocaleTimeString()}
              direction={message.receiverId === +id ? "end" : "start"}
            />
          ))
        )}
        {/* <MessageCard text={"hello"} date={"12/Aug"} direction="start" />

        <MessageCard text={"hello"} date={"12/Aug"} direction="end" /> */}
      </Box>
      <TextField
        placeholder="Enter a message"
        variant="standard"
        fullWidth
        multiline
        rows={2}
      ></TextField>
    </Box>
  );
};

export default ChatScreen;

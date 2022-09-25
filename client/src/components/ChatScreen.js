import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_MSGS } from "../graphql/queries";
import MessageCard from "./MessageCard";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/material";
import { SEND_MSG } from "../graphql/mutations";
import { MSG_SUB } from "../graphql/subscriptions";

const ChatScreen = () => {
  const { id, name } = useParams();

  const [text, setText] = useState();
  const { data, loading, error } = useQuery(GET_MSGS, {
    variables: { receiverId: +id },
    onCompleted(data) {
      setMessages(data.messagesByUser);
    },
  });


  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      setMessages((prevMessages) => [...prevMessages, data?.createMessage]);
    },
  });

  const [messages, setMessages] = useState([]);

  
  const { data: subData } = useSubscription(MSG_SUB);

  if (subData) console.log(subData);

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
          messages?.map((message) => (
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
      <Stack direction="row">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></TextField>
        <SendIcon
          fontSize="large"
          onClick={() => sendMessage({ variables: { receiverId: +id, text } })}
        />
      </Stack>
    </Box>
  );
};

export default ChatScreen;

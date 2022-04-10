import { Box, Typography,Divider } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";

const SideBar = () => {
  const users = [
    { id: 1, firstName: "Rohit", lastName: "Verma" },
    { id: 1, firstName: "Rohit", lastName: "Verma" },
    { id: 1, firstName: "Rohit", lastName: "Verma" },
  ];
  return (
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    width="250px"
    padding="10px" 
    >
      <Typography variant="h6">Chat</Typography>
      <Divider/>
      {
          users.map((user,i)=><UserCard key={`user${i}`} user={user}/>)
      }
    </Box>
  );
};

export default SideBar;

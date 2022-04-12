import { Box, Typography, Divider, Stack, IconButton } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const users = [
    { id: 1, firstName: "Rohit", lastName: "Verma" },
    { id: 1, firstName: "Rohit", lastName: "Verma" },
    { id: 1, firstName: "Rohit", lastName: "Verma" },
  ];
  return (
    <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Chat</Typography>
        <IconButton variant="outlined" color="primary">
          <LogoutIcon />
        </IconButton>
      </Stack>

      <Divider />
      {users.map((user, i) => (
        <UserCard key={`user${i}`} user={user} />
      ))}
    </Box>
  );
};

export default SideBar;

import React, { useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";

function AuthScreen() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
        <Typography variant="h5">Please Signup</Typography>
        <TextField
          label="First Name"
          variant="standard"
          name="firstName"
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          variant="standard"
          name="lastname"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="standard"
          name="email"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="standard"
          name="password"
          onChange={handleChange}
          type="password"
        />
        <Button variant="outlined">Sign up</Button>
      </Stack>
    </Box>
  );
}

export default AuthScreen;

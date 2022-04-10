import React, { useState, useRef } from "react";
import { Box, Stack, Typography, Button, TextField, Card } from "@mui/material";

function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const authForm = useRef(null);
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
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card sx={{ padding: "10px" }} variant="outlined">
        <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
          <Typography variant="h5">
            Please {showLogin ? "Signin" : "Signup"}
          </Typography>
          {!showLogin && (
            <>
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
            </>
          )}
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
          <Typography
            variant="subtitle1"
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({})
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login"}
          </Typography>
          <Button variant="contained" type="submit">
            {showLogin ? "Signin" : "Signup"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default AuthScreen;

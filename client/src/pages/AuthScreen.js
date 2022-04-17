import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../graphql/mutations";

function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const authForm = useRef(null);

  const [signupUser, { data: signupData, loading: l1, error: e1 }] =
    useMutation(SIGNUP_USER);

  useEffect(() => {
    console.log(l1);
    console.log(signupData);
  }, [l1, signupData]);

  if (l1 && !signupData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Authenticating...</Typography>
        </Box>
      </Box>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (showLogin) {
      //signin
    } else {
      //signup
      signupUser({
        variables: { userNew: formData },
        notifyOnNetworkStatusChange: true
      });
    }
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
          {signupData && (
            <Alert severity="success">
              {signupData?.signupUser?.firstName} Signed up!
            </Alert>
          )}
          {e1 && <Alert severity="error">{e1?.message} Signed up!</Alert>}

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
                name="lastName"
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
              setFormData({});
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

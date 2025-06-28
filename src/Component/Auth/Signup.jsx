import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box , Typography , TextField, Button } from "@mui/material";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    async function handleSubmit(e) {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate("/");
      } catch {
        setError("Failed to create an account");
      }
      setLoading(false);
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <div>
         <Typography variant="h5" mb={2} textAlign="center">
        Sign Up
      </Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        id="email"
        inputRef={emailRef} 
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        id="password"
        inputRef={passwordRef}
        required
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        id="password-confirm"
        inputRef={passwordConfirmRef}
        required
      />
      <Button
       disabled={loading}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      </div>
      <Typography mt={1} sx={{textAlign: "center"}}>
      Already have an account? <Link to="/login">Log In</Link>
      </Typography>
     
    </Box>
  );
}
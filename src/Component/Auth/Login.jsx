import { React, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath);
    } catch {
      setError("Failed to log in");
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
            Log In
          </Typography>
          <TextField
            label="Email"
            name="email"
            id="email"  inputRef={emailRef} 
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            id="password"
                    inputRef={passwordRef}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
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
            Log In
          </Button>
       </div>
       <Typography mt={1} sx={{textAlign: "center"}}>
           Need an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
}

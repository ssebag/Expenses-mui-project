import { Box, TextField , Button , styled, Snackbar, IconButton } from '@mui/material'
import React , { useState }from 'react'
import { purple } from '@mui/material/colors'
import { ChevronRight, Padding, Close } from '@mui/icons-material';
import { db, auth } from '../firebase';
import { collection , addDoc , serverTimestamp } from 'firebase/firestore';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export default function Create() {
 const [open ,setopen] = useState(false);
 const [title, settitle] = useState("")
 const [price, setprice] = useState(0)
 const handleSubmit = async(e)=>{
  e.preventDefault();
  const user= auth.currentUser;
  
  try{
    await addDoc(collection(db, "things"),{
      userId: user.uid,
      title: title,
      price: parseFloat(price),
      createdAt: serverTimestamp(),
    });
    settitle("");
    setprice("");
    setopen(true);
  } catch (err) {
    console.error("error:", err);
  }
 }

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'center'}}
    >
        <TextField
        value={title}
        onChange={(eo)=>{
         settitle(eo.target.value)
        }}
          label="Thing"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <span style={{marginRight: '10px'}}>&#128073;</span>,
            },
          }}
        />
         <TextField
         value={price}
          onChange={(eo)=>{
            setprice(Number(eo.target.value))
           }}
         fullWidth={true}
          label="Price"
          sx={{ m: 1, width: '250px' }}
          slotProps={{
            input: {
              startAdornment: <span style={{marginRight: '10px'}}>$</span>,
            },
          }}
        />
        <ColorButton type='submit' variant="contained">Submit <ChevronRight /> </ColorButton>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={3000}
          onClose={()=> setopen(false)}
          message="Added Successfully"
        />
    </Box>
  )
}

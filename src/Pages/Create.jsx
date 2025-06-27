import { Box, TextField , InputAdornment, Button , styled } from '@mui/material'
import React , { useState }from 'react'
import { purple } from '@mui/material/colors'
import { ChevronRight, Padding } from '@mui/icons-material';


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export default function Create() {
 const [title, settitle] = useState("")
 const [price, setprice] = useState(0)

  return (
    <Box
    sx={{display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'center'}}
    >
        <TextField
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
        <ColorButton onClick={(params)=>{
           fetch("https://phrygian-silky-observation.glitch.me/myData",{
            method: 'POST',
            headers:{
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title, price})
           })
        }} variant="contained">Submit <ChevronRight /> </ColorButton>
    </Box>
  )
}

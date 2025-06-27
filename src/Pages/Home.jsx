import { Box, Paper, Typography, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Close } from '@mui/icons-material'

export default function Home() {
  const [data, setdata] = useState([]);
  let totalPrice = 0
  useEffect(() => {
    fetch("https://phrygian-silky-observation.glitch.me/myData")
    .then((res)=> res.json())
    .then((data) => setdata(data));
  }, [data])
  
  return (
    <Box 
      sx={{display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px'}}
    >
    {
      data.map((item)=>{
         totalPrice +=  item.price;
        return(
          <Paper
          key={item.id}
          sx={{ width: '400px', padding: '30px 0',
          borderRadius: '5px',
          boxShadow: '1px 4px 5px 3px gray',
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-around',
        }}>
          <Typography variant="p" color="initial">{item.title}</Typography>
          <Typography variant="p" color="initial">{item.price}</Typography>
          <IconButton onClick={()=>{
            fetch(`https://phrygian-silky-observation.glitch.me/myData/${item.id}`, {method:"DELETE"})
          }} aria-label="close"
             sx={{
              position: 'absolute',
              top: '10px',
              right: '15px'
            }}>
            <Close />
          </IconButton>
        </Paper>
        );
      })
    }
    <Typography variant="h6" color="initial">
      You Spend <span style={{marginRight: '10px'}}>&#128073;</span> ${totalPrice}
    </Typography>
    </Box>

    
  )
}

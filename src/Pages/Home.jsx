import { Box, Paper, Typography, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { db, auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home() {
  /* for delete */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "things", id));
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Error deleting document: ", err);
    }
  };


  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user logged in.");
      return;
    }

    const q = query(
      collection(db, "things"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      let sum = 0;

      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
        sum += doc.data().price;
      });

      setProducts(items);
      setTotal(sum);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box 
      sx={{display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px'}}
    >
    {
      products.map((item)=>{
       
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
           <IconButton onClick={()=> handleDelete(item.id)} aria-label="close"
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
      You Spend <span style={{marginRight: '10px'}}>&#128073;</span> ${total}
    </Typography>
    </Box>

    
  )
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import UserContentCard from './UserContentCard'
import { useNavigate } from 'react-router-dom';
import {setContents} from "../redux/actions/contentActions"
import axios from 'axios';
import { useState, useEffect } from 'react';

  export default function UserContent() { 

  const navigate = useNavigate();

  const contents = useSelector((state) => state.allContents.contents)
  const dispatch = useDispatch();

  const [user, setUser] = useState(null)
  useEffect(() => {
    const userString = localStorage.getItem("user")
    if(userString){
      setUser(JSON.parse(userString))
    }
  });

  const fetchContents = async () => {
      const response = await axios
      .get("/api/v1/contents")
      .catch((err) => {
        console.log("Err", err)
      });
      dispatch(setContents(response.data));
  }
  useEffect(() => {
    fetchContents();
  }, []);

  if(user){
    var contentsByUserId = contents.filter(item => item.author.id === user.id);
  }else{
    var contentsByUserId = contents;
  }
    
    return (
      <Container component="about" maxWidth="lg">
        <CssBaseline />          
        <main>
        <Grid container>
        <Grid item md={8} style={{ flexGrow: "1" }}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h2" variant="h3" color="inherit" > 
              Таны үлгэрүүд
            </Typography>

            {/* <Link variant="subtitle1" href="#">
            <Typography variant="h5" color="inherit" paragraph>
            Шинэ үлгэр үүсгэх бол энд дарна уу
            </Typography>        
            </Link>            */}
            </Box>
            </Grid>
            <Grid item md={4}>
            <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              mt: 3
            }}
          >         
            <Button variant="contained" onClick={() => {
                navigate("/CreateContent");
                }}>Шинэ үлгэр үүсгэх</Button>
          </Box>
        </Grid>
      </Grid> 
          <Grid container spacing={8} direction="row" padding="0px 50px 50px 50px">
          {contentsByUserId.map((post) => (
              <UserContentCard key={post.id} post={post}/>
            ))}
          </Grid>
        </main>
      </Container>
  );
}
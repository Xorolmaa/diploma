import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled, { keyframes } from 'styled-components';
import {bounce} from 'react-animations'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { removeSelectedContent, selectedContent } from '../redux/actions/contentActions';
import Footer from "./Footer"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation}`;

const theme = createTheme({
    typography: {
      fontFamily: 'Cormorant Infant',
    }
  });

export default function ContentDetail() { 

    const navigate = useNavigate();
    const post = useSelector((state) => state.content.content)

    const { contentId } = useParams();
    const dispatch = useDispatch();
   

    const fetchContentDetail = async () => {
      const response = await axios
      .get(`/api/v1/content/${contentId}`)
      .catch((err) => {
        console.log("Err", err)
      });
      dispatch(selectedContent(response.data));
    }

    useEffect(() => 
      {
        if(contentId && contentId!=="") fetchContentDetail();
        return () => {
          dispatch(removeSelectedContent())
        }
      } , [contentId]);


    const [versionSelected, setVersionSelected] = React.useState(null);
    const [textDisable, setTextDisable] = React.useState(false);
    const [audioDisable, setAudioDisable] = React.useState(false);


  const versionSelectionChangeHandler = (event) => {
    setVersionSelected(event.target.value);
   
  };

    return (
    <ThemeProvider theme={theme}>
        <Container component="contentDetail" >
        <CssBaseline />
            <Box
                sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <BouncyDiv>
                    <Typography component="h2" variant="h2" >
                    {post && post.title}
                    </Typography>
                </BouncyDiv >

                <Card sx={{ display: 'flex'}} minHeight="300px">
                  <Grid container spacing={2} columns={{ xs: 4, md: 12 }}   direction="row">
                    <Grid item xs={5}>
                      {post && post.imageUrl && <CardMedia
                        component="img"
                        sx={{ p:2,display: { xs: 'none', sm: 'block'}, }}
                        image={`${post.imageUrl}`}
                      />}
                    </Grid>
                    <Grid item xs={7} >
                      <CardContent sx={{ flex: 1 , p: 2}} >    
                        <Grid container spacing={2} columns={{ xs: 4, md: 12 }} direction="column">   
                          <Grid item xs={12} sx={{ pt: 5}}>
                            <Typography variant="subtitle1" color="text.secondary" fontSize="20px"> 
                              {post && post.category && post.category.categoryName }
                            </Typography>
                            <Typography variant="subtitle2" color="text.secodary" fontSize="24px">
                              {post && post.author && post.author.firstName}
                            </Typography>
                            <FormControl variant="standard"  sx={{  mt: 1, minWidth: 100,
                                          display: { xs: 'none', md: 'flex' }}}>
                              {versionSelected === null ? (
                                  <InputLabel disableAnimation shrink={false} focused={false} id='item_type_label' color="secondary">
                                    Хувилбар сонгоно уу
                                  </InputLabel>
                                ) : null}
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={versionSelected}
                                onChange={versionSelectionChangeHandler}
                                disableUnderline 
                                placeholder="Хувилбар"
                              >
                                {post && post.versions && post.versions.map((version) => {
                                  return (
                                    <MenuItem value={version.id}>{version.versionName}</MenuItem>
                                  )
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                          </Grid>
                          <Grid item xs={12} alignItems= 'center' justifyContent="center">
                          {versionSelected === null ? (
                          <><Button variant="outlined" color="primary" sx={{ mr: 2 }} disabled={true} onClick={() => navigate(`/ContentText/${versionSelected}`)} type="button">
                            Унших
                            <BookmarkIcon sx={{ fontSize: 20 }} />
                          </Button><Button variant="outlined" color="primary" disabled={true} onClick={() => navigate(`/ContentAudio/${versionSelected}`)}>
                              Сонсох
                              <HeadphonesIcon sx={{ fontSize: 20 }} />
                            </Button></>
                            ) : (
                            <><Button variant="outlined" color="primary" sx={{ mr: 2 }} disabled={false} onClick={() => navigate(`/ContentText/${versionSelected}`)} type="button">
                              Унших
                              <BookmarkIcon sx={{ fontSize: 20 }} />
                            </Button><Button variant="outlined" color="primary" disabled={false}  onClick={() => navigate(`/ContentAudio/${versionSelected}`)}>
                                Сонсох
                                <HeadphonesIcon sx={{ fontSize: 20 }} />
                              </Button></>)}
                          </Grid>
                        </Grid>  
                      </CardContent>  
                    </Grid>
                  </Grid>   
                </Card>
            </Box>
            <Footer/>
        </Container>
    </ThemeProvider>  
)
}

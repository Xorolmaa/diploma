import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from "./Footer"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import {setContents} from "../redux/actions/contentActions"
import ContentCard from './ContentCard';

const mainFeaturedPost = {
  title: 'Үлгэрийн цахим сан',
  description:
    "Манай сайтаас олон сонирхолтой үлгэр олж унших боломжтой",
  image: 'https://img.freepik.com/free-vector/magic-fairytale-concept_23-2148463220.jpg?w=2000',
  imageText: 'main image description',
};


const theme = createTheme();

export default function Home() {

  const contents = useSelector((state) => state.allContents.contents)
  const category = useSelector((state) => state.category)
  const dispatch = useDispatch();

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
  }, [category]);

  if(category.payload!==0){
    var contentsByCategory = contents.filter(item => item.category.id === category.payload);
  }else{
    var contentsByCategory = contents;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {contentsByCategory.map((post) => (
              <ContentCard key={post.id} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}
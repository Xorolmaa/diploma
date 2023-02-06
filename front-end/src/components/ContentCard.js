import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios'
import { useSelector } from 'react-redux';


function ContentCard(props) {
  const { post } = props;

  const found = post.versions.find(element => element.isDefault===true);
  var date = new Date(found.publishDate);

  const [changeLike, setChangeLike] = useState(true)
  const [likeNumber, setLikeNumber] = useState(post.likeNumber+1)
  function handleLike() {
    setChangeLike(!changeLike)
  }
  
  let data2 = post;
   useEffect(() => {
    if(!changeLike){
      axios.put(`/api/v1/update-added-like/${post.id}`, data2)
      .then(setLikeNumber(prevCount => prevCount + 1));      
    }else{
      axios.put(`/api/v1/update-reduced-like/${post.id}`, data2)
      .then(setLikeNumber(prevCount => prevCount - 1));
    }   
  },[changeLike]);

  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

  return (
    <Grid item xs={12} md={6} >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }} minHeight="300px">
          <Grid container spacing={0} columns={{ xs: 4, md: 12 }}  alignItems="center"  justifyContent="center" direction="row">
            <Grid item xs={6}>
              <CardMedia
                component="img"
                sx={{ width: 250, height:150, display: { xs: 'none', sm: 'block' }, pt: 2, pl: 2 }}
                image={`${post.imageUrl}`}
              />
            </Grid>
            <Grid item xs={6} >
              <CardContent sx={{ flex: 1 , p: 0}} >    
                <Grid container spacing={0} columns={{ xs: 4, md: 12 }} >   
                  <Grid item xs={12} sx={{ pt: 5}}>
                    <Typography component="h2" variant="h6">
                    {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {post.category.categoryName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {post.author.firstName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {found.versionName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {`${date.getFullYear()}`+"-"+`${date.getMonth()+1}`+"-"+`${date.getDate()}`}
                    </Typography>
                  </Grid>
                  {isLoggedIn ? <Grid item xs={6}>
                      <IconButton aria-label="add to favorites"  onClick={handleLike}>
                        {changeLike ? <FavoriteBorderIcon  sx={{ fontSize: 18 , color: pink[500]}}/>
                        : <FavoriteIcon  sx={{ fontSize: 18 , color: pink[500]}}/>
                        }
                      </IconButton>     
                      <span style={{color: pink[500]}}>                  
                        {likeNumber}                     
                      </span>
                  </Grid>:
                  <Grid item xs={6}>
                      <IconButton aria-label="add to favorites"  >
                        <FavoriteIcon  sx={{ fontSize: 18 , color: pink[500]}}/>                       
                      </IconButton>     
                      <span style={{color: pink[500]}}>                  
                        {likeNumber}                     
                      </span>
                  </Grid>}
                </Grid>  
              </CardContent>  
            </Grid>
            <Grid item xs={12}>
              <CardContent sx={{ flex: 1 , pt:0}}>
              <Typography variant="subtitle1" 
                >
                  {found.text}
                </Typography>
                <Link to={`/ContentDetail/${post.id}`} >
                <Typography variant="subtitle1" color="primary" 
                >
                  Үргэлжлүүлэх...
                </Typography>
                </Link>
              </CardContent> 
            </Grid>           
          </Grid>   
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default ContentCard;
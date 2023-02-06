import * as React from 'react';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function UserContentCard(props) {
  const navigate = useNavigate();
  
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <Card component="li" sx={{ minWidth: 250, flexGrow: 1 }}>
        <CardCover>
          <img         
            src={`${post && post.imageUrl}`}
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
        <CardContent textColor="#ffffff">
          <Grid container spacing={2} marginLeft="30px">
            <Grid item xs={8}>
              <Typography
                level="h2"
                fontWeight="lg"
                textColor="#ffffff"
                mt={{ xs: 12, sm: 18 }}
              >
                {post && post.title}          
              </Typography>
            </Grid>           
            <Grid item xs={4} >
            <Typography
                textColor="#ffffff"
                mt={{ xs: 12, sm: 18 }}
              >
                <IconButton variant="plain" color="neutral" size="sm" sx={{ "&:hover": { color: "blue" } }} onClick={()=>navigate(`/EditContent/${post.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ "&:hover": { color: "blue" } }} 
                 onClick={()=>navigate(`/DeleteContent/${post.id}`)}
                
                >
                  <DeleteIcon/>
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
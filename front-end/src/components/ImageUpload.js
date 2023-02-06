// imports the React Javascript Library
import React, { useState } from "react";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Fab from "@mui/material/Fab";
import CollectionsIcon from "@mui/icons-material/Collections";
import CardMedia from '@mui/material/CardMedia';
import CardCover from '@mui/joy/CardCover';
import Card from '@mui/joy/Card';

function ImageUpload() {
    
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  
    return (
        <div >           
                <img
                    
                    width="300px"         
                    src={file}
                    loading="lazy"
                    alt=""
                />
                <input type="file" onChange={handleChange} />
        </div>
  
    );
}
export default ImageUpload;

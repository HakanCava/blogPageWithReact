import { Box, Paper } from '@mui/material'
import React from 'react'
import logo from "../assets/myAvatar.png"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import  {IoLogoLinkedin} from "react-icons/io";
import  {BsGithub} from "react-icons/bs";

export default function About() {
  return (
    <Box sx={{display:"flex",justifyContent:"center"}}>
    <Paper elevation={24} sx={{ maxWidth: 445,borderRadius:"20px" ,textAlign:"center"}}>
      <CardMedia
        sx={{ maxHeight: 350 }}
        image={logo}
        title="myavatar"
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Hakan
        </Typography>
        <Typography variant="body1" color="text.secondary">
     FrontEnd Developer
        </Typography>
      </CardContent>
      <CardActions sx={{fontSize:"1.3rem",display:"flex", justifyContent:"center"}}>
        <Button size="small" href="https://github.com/HakanCava" target='blank' sx={{fontSize:"2.5rem","&:hover":{color:"red"}}}><BsGithub /></Button>
        <Button size="small"  href="https://www.linkedin.com/in/hakancava/" target='blank' sx={{"&:hover":{color:"red"},fontSize:"3rem"}}><IoLogoLinkedin /></Button>
      </CardActions>
    </Paper>
    </Box>
  );
}
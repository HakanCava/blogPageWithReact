import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCall from "../hooks/useBlogCall";
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
    const { currentUserID, currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.blog);
  const { getBlogData,deleteBlogCategory } = useBlogCall();

  const handleDelete=(id)=>{
    deleteBlogCategory("categories",id,"Category")
    
  }


  useEffect(() => {
    getBlogData("categories");
  }, []);

  const staticCategories=["Trivia","Travel","Web Development","AI","Science","Fashion"]
  const userCategories=categories?.filter((category)=>!staticCategories?.includes(category.name))
  console.log(categories);
console.log(userCategories);
  return (
    <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",mb:10}}>
        <Box sx={{maxWidth:500,bgcolor:"antiquewhite",p:5}}>
            <Typography sx={{fontSize:"1.2rem",fontWeight:600}}><Typography sx={{fontSize:"1.3rem",fontWeight:900,color:"red"}}>Hello {currentUser.toUpperCase()}. </Typography>You can see the categories below before create a new blog. However,if you don't find category for your blog ,you can create a new category at your personel blog page. Keep writing...</Typography>
        </Box>
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: grey[900],
        position: "relative",
       mt:3
      }}
    >
        <Typography sx={{textAlign:"center",color:"white"}}>Categories</Typography>
      {staticCategories?.map((category,i) => (
        <Box key={i}>
        <ListItem  sx={{bgcolor:grey[600],color:"white"}}>
          <ListItemText primary={` ${category}`} />
          
        </ListItem>
        <Divider/>
        </Box>
      ))}
      {userCategories?.map((category) => (
        <Box key={category.id}>
        <ListItem  sx={{bgcolor:grey[600],color:"white"}}>
          <ListItemText primary={` ${category.name}`} />
          <DeleteIcon onClick={()=>handleDelete(category.id)} sx={{color:"red",bgcolor:"white",borderRadius:"10px",cursor:"pointer"}}/>
        </ListItem>
        <Divider/>
        </Box>
      ))}
    </List>
    </Box>
  );
};

export default Categories;

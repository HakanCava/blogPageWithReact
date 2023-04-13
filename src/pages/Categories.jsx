import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCall from "../hooks/useBlogCall";
import  List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import  ListItemText from "@mui/material/ListItemText";
import Divider  from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from "react";
import CategoryUpdateModal from "../components/modal/CategoryUpdateModal";
import { Helmet } from "react-helmet";

const Categories = () => {
    const { currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.blog);
  const { getBlogData,deleteBlogCategory } = useBlogCall();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updateCategory,setUpdateCategory]=useState({
    name:"",
   
  })

  const handleDelete=(id)=>{
    deleteBlogCategory("categories",id,"Category")
    
  }


  useEffect(() => {
    getBlogData("categories");
  }, []);

  const staticCategories=["Trivia","Travel","Web Development","AI","Science","Fashion"]
  const userCategories=categories?.filter((category)=>!staticCategories?.includes(category.name))

  return (
    <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",mb:10}}>
       <Helmet>
        <title>Categories</title>
      </Helmet>
        <Box sx={{maxWidth:500,bgcolor:"antiquewhite",p:5}}>
            <Typography sx={{fontSize:"1.2rem",fontWeight:600}}><span style={{fontSize:"1.3rem",fontWeight:900,color:"red",display:"block"}}>Hello {currentUser.toUpperCase()}. </span>You can see the categories below before create a new blog. However,if you don't find category for your blog ,you can create a new category at your personel blog page. Keep writing...</Typography>
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
          <UpdateIcon onClick={()=>  {
            handleOpen()
            setUpdateCategory(category)
            }} sx={{cursor:"pointer",color:"blue",bgcolor:"white",borderRadius:"10px",mr:1  }} />
<CategoryUpdateModal
              open={open}
              handleClose={handleClose}
              updateCategory={updateCategory}
              setUpdateCategory={setUpdateCategory}
              id={category.id}
            />
          

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

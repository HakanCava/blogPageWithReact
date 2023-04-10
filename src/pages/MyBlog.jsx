import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCall from "../hooks/useBlogCall";
import BlogCard from "../components/blog/BlogCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryModal from "../components/modal/CategoryModal";

const MyBlog = () => {
  const { userBlogs } = useSelector((state) => state.blog);
  const { currentUserID, currentUser } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const { getBlogUniqData } = useBlogCall();
  useEffect(() => {
    getBlogUniqData("blogs", `?author=${currentUserID}`, "userBlogs");
  }, []);
  
  return (
    <Box>
      <Box sx={{ textAlign: "center",p:2,bgcolor:"antiquewhite" }}>
        <Typography variant="h5">Hi {currentUser.toUpperCase()}</Typography>
      
        <Button size="large" onClick={()=>navigate("/newblog")} >
          create blog
        </Button>
        <Button size="large"  onClick={()=>{
                handleOpen()
            
              }}>
          create category
        </Button>
        <CategoryModal
              open={open}
              handleClose={handleClose}
              
            />
            <Button size="large" onClick={()=>navigate("/categories")}>see all categories</Button>
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 10,
        }}
      >
        {userBlogs?.length
          ? ``
          : `Hi ${currentUser.toUpperCase()}. You don't have any blogs to show. Let's write something.... `}
        {userBlogs?.map((blog) => (
          <Grid item key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBlog;

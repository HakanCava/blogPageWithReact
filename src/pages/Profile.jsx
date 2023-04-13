import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import  ListItemText from "@mui/material/ListItemText";
import Divider  from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import { useEffect } from "react";
import useBlogCall from "../hooks/useBlogCall";
import { Helmet } from "react-helmet";

const Profile = () => {

  const { userBlogs } = useSelector((state) => state.blog);
  const { currentUserID, currentUser } = useSelector((state) => state.auth);

const { getBlogUniqData } = useBlogCall();
useEffect(() => {
  getBlogUniqData("blogs", `?author=${currentUserID}`, "userBlogs");
}, []);

  return (
    <Box sx={{p:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
       <Helmet>
        <title>Profile</title>
      </Helmet>
<Box sx={{textAlign:"center",bgcolor:"antiquewhite",p:3}}>
  <Typography>Your Profile</Typography>
  <Typography>User Name:<span style={{textDecoration:"underline",color:"red"}}>{currentUser.charAt(0).toUpperCase()}
        {currentUser.slice(1).toLowerCase()}</span></Typography>
  <Typography>User Id:{currentUserID}</Typography>
</Box>
<Divider/>
<Box sx={{bgcolor:grey[900],color:"white",py:1,width:"300px"}}>
  <Typography sx={{p:1}}>Your Blogs:</Typography>
  {userBlogs?.map((blog,index)=>(<Box key={index}>
    <ListItem   sx={{bgcolor:grey[600],color:"white"}}>
      <ListItemText primary={` ${blog.title}`}/>
    </ListItem>
    <Divider/>
    </Box>
  ))}
</Box>

</Box>
  )
}

export default Profile
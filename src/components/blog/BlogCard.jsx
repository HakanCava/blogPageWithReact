import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";

export default function BlogCard({ blog }) {
  console.log(blog);
  const {
    id,
    title,
    content,
    image,
    author,
    status,
    post_views,
    comment_count,
    category,
    category_name,
    likes,
    comments,
    likes_n,
    publish_date,
  } = blog;

  const navigate = useNavigate();
  const { currentUser,currentUserID } = useSelector((state) => state.auth);
  // const { likes, comments } = useSelector((state) => state.blog);

  const { postLikeComment,getLikeComment } = useBlogCall();

  const handleLike = () => {
    postLikeComment("likes", id, "like",currentUserID);
  };
  
  // useEffect(()=>{
  //   console.log("useEffect");
  //   getLikeComment("likes",id)
  // },[])

  const userID=likes_n.filter((item)=>item.user_id===currentUserID)
  console.log(userID);

  return (
    <Card
      sx={{
        p: 2,
        width: "500px",
        minHeight: "500px",
        maxHeight:"550px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb:1
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        sx={{ height: 180, objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {title.charAt(0).toUpperCase()}
        {title.slice(1).toLowerCase()}
        </Typography>
        <Typography sx={{fontSize:"0.8rem"}}>({category_name})</Typography>
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex" }}>
        <AccountCircleIcon />
        {author.charAt(0).toUpperCase()}
        {author.slice(1).toLowerCase()}
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button
            size="small"
            sx={{ fontSize: "1.2rem" }}
            onClick={() => (currentUser ? handleLike() : navigate("login"))}
          >
            {!currentUser&&<FavoriteIcon sx={{ color:"gray" }} />}
           {currentUser&& <FavoriteIcon sx={{ color: () => (userID?.length ? "red" : "gray") }} />}
            {likes}
          </Button>
          <Button size="small" sx={{ fontSize: "1.2rem" }}>
            <CommentIcon sx={{ color: "gray" }} />
            {comment_count}
          </Button>
          <Button size="small" sx={{ fontSize: "1.2rem" }}>
            <VisibilityIcon sx={{ color: "gray" }} />
            {post_views}
          </Button>
        </Box>
        <Button
          onClick={() =>
            currentUser ? navigate(`/detail/${id}`) : navigate("login")
          }
          sx={{
            bgcolor: "blue",
            color: "white",
            "&:hover": { bgcolor: "red" },
            fontWeight: "800",
          }}
        >
          read more
        </Button>
      </CardActions>
    </Card>
  );
}







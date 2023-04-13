import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlogCall from "../hooks/useBlogCall";
import { useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useRef } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import CommentCard from "../components/blog/CommentCard";
import BlogModal from "../components/modal/BlogModal";
import { Helmet } from "react-helmet";

const Detail = () => {
  const { blog } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const messagesEndRef = useRef();
  const scrollTop = useRef();
  const { id } = useParams();
  console.log(id);

  const { getBlogUniqData } = useBlogCall();
  const { currentUserID, currentUser } = useSelector((state) => state.auth);
  const [comment, setComment] = useState({
    content: "",
    post: id,
  });

  const [show, setShow] = useState(false);

  const { postLikeComment, deleteBlogCategory } = useBlogCall();

  const handleLike = () => {
    postLikeComment("likes", id, "like", currentUserID);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postLikeComment("comments", id, "comment", currentUserID, comment);

    setComment({
      content: "",
      post: id,
    });
    setShow(true);
    messagesEndRef.current?.scrollIntoView();
  };

  const handleDelete = () => {
    deleteBlogCategory("blogs", id, "Blog");
    navigate(-1);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [info, setInfo] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    getBlogUniqData("blogs", `${id}`, "blog");
  }, []);

  const userID = blog?.likes_n.filter((item) => item.user_id === currentUserID);

 

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 20 }}>
       <Helmet>
        <title>{blog?.title}</title>
      </Helmet>
      <Box ref={scrollTop}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 2,
            width: "500px",
            height: "520px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMedia
            component="img"
            alt={blog?.title}
            height="140"
            image={blog?.image}
            sx={{ height: 180, objectFit: "contain" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog?.title.charAt(0).toUpperCase()}
              {blog?.title.slice(1).toLowerCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog?.content}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex" }}>
            <AccountCircleIcon />
            {blog?.author.charAt(0).toUpperCase()}
            {blog?.author.slice(1).toLowerCase()}
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            {new Date(blog?.publish_date).toLocaleDateString("tr-TR")}
          </CardContent>

          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Button
                size="small"
                sx={{ fontSize: "1.2rem" }}
                onClick={handleLike}
              >
                <FavoriteIcon
                  sx={{ color: () => (userID?.length ? "red" : "gray") }}
                />
                {blog?.likes}
              </Button>
              <Button
                size="small"
                sx={{ fontSize: "1.2rem" }}
                onClick={() => setShow(!show)}
              >
                <CommentIcon sx={{ color: "gray" }} />
                {blog?.comment_count}
              </Button>
              <Button size="small" sx={{ fontSize: "1.2rem" }}>
                <VisibilityIcon sx={{ color: "gray" }} />
                {blog?.post_views}
              </Button>
            </Box>
          </CardActions>
        </Paper>
        {currentUser === blog?.author && (
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              sx={{
                bgcolor: "#ab003c",
                color: "white",
                "&:hover": { bgcolor: "#f50057" },
                mr: 1,
                fontSize: "1.3rem",
              }}
              onClick={handleDelete}
            >
              <MdDeleteForever sx={{ fontSize: "1.8rem" }} />
              <Typography ml={1}>delete</Typography>
            </Button>
            <Button
              sx={{
                bgcolor: "#52b202",
                color: "white",
                "&:hover": { bgcolor: "#76ff03" },
                fontSize: "1.2rem",
              }}
              onClick={() => {
                handleOpen();
                setInfo(blog);
              }}
            >
              <GrUpdate sx={{ fontSize: "1.3rem" }} />
              <Typography ml={1}>update</Typography>
            </Button>
            {/* //!modal */}
            <BlogModal
              open={open}
              handleClose={handleClose}
              info={info}
              setInfo={setInfo}
              id={id}
            />
          </Box>
        )}
        {/* //!comment */}
        <Box
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Enter Comment"
            type="text"
            id="content"
            name="content"
            value={comment.content}
            onChange={handleChange}
          />
          <Button type="submit" sx={{ bgcolor: "blue", color: "white", mt: 1 }}>
            <BsFillSendFill /> add comment
          </Button>
        </Box>

        {show && (
          <Box>
            {blog?.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                messagesEndRef={messagesEndRef}
              />
            ))}
            <Box>
              <Avatar
                sx={{ "&:hover": { bgcolor: "gray", cursor: "pointer" } }}
                onClick={() => scrollTop.current?.scrollIntoView()}
              >
                <MdKeyboardDoubleArrowUp />
              </Avatar>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Detail;

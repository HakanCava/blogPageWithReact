import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BlogModal = ({id, open, handleClose, info, setInfo }) => {
  const { loading } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.blog);
  const { getBlogData } = useBlogCall();
  const { currentUserID, currentUser } = useSelector((state) => state.auth);
const {putBlogCategory}=useBlogCall()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putBlogCategory("blogs",id,"Blog",currentUserID,info)
    handleClose();
    setInfo({
        title: "",
        content: "",
        category: "",
        image: "",
        status: "",
      });
  };

  
  useEffect(() => {
    getBlogData("categories");
  }, []);


  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
          setInfo({
            title: "",
            content: "",
            category: "",
            image: "",
            status: "",
          });
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={{display:"flex",justifyContent:"center",}}>
        <Fade in={open}  >
          <Paper elevation={24} sx={{ p: 2, m: 1, minWidth: "450px",maxWidth:"500px" }}>
            <Box sx={{ style }} component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                required
                id="title"
                type="text"
                label="Title"
                name="title"
                variant="outlined"
                value={info?.title || ""}
                onChange={handleChange}
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="image"
                type="url"
                label="Image URL"
                name="image"
                variant="outlined"
                value={info?.image || ""}
                onChange={handleChange}
              />

              {/*  */}
              <FormControl required sx={{ mt: 3, width: "100%" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  value={info?.category || ""}
                  
                >
                  <MenuItem value="">
                    <em>Please Choose...</em>
                  </MenuItem>
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*  */}

              <FormControl required sx={{ mt: 3, width: "100%" }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  value={info?.status || ""}
                  
                >
                  <MenuItem value="">
                    <em>Please Choose...</em>
                  </MenuItem>

                  <MenuItem value="d">Draft</MenuItem>
                  <MenuItem value="p">Published</MenuItem>
                </Select>
              </FormControl>

              {/*  */}

              <TextField
                margin="normal"
                fullWidth
                required
                id="content"
                type="text"
                label="Content"
                name="content"
                variant="outlined"
                value={info?.content || ""}
                onChange={handleChange}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
                loadingPosition="center"
              >
                add new blog
              </LoadingButton>
            </Box>
          </Paper>
        </Fade>
        </Box>
      </Modal>
    </>
  );
};

export default BlogModal;

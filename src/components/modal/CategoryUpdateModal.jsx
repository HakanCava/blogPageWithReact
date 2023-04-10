import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
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

const CategoryUpdateModal = ({
  id,
  open,
  handleClose,
  updateCategory,
  setUpdateCategory,
}) => {
  const { loading } = useSelector((state) => state.auth);

  const { getBlogData } = useBlogCall();
  const { currentUserID } = useSelector((state) => state.auth);

  const { putBlogCategory } = useBlogCall();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateCategory({ ...updateCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putBlogCategory(
      "categories",
      id,
      "Category",
      currentUserID,
      updateCategory
    );
    handleClose();
    setUpdateCategory({
      name: "",
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
          setUpdateCategory({
            name: "",
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Fade in={true}>
            <Paper
              elevation={24}
              sx={{ p: 2, m: 1, minWidth: "450px", maxWidth: "500px" }}
            >
              <Box sx={{ style }} component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="name"
                  type="text"
                  label="Enter your category"
                  name="name"
                  variant="outlined"
                  value={updateCategory?.name || ""}
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
                  update category
                </LoadingButton>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryUpdateModal;

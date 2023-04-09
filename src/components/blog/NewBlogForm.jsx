import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Form } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useBlogCall from "../../hooks/useBlogCall";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Paper } from "@mui/material";

export const newBlogSheme = object({
  title: string()
    .required("Title is required")
    .max(100, "password must be at most 100 characters"),
  category: string().required("Category is required"),
  status: string().required("Status is required"),
  image: string()
    .required("Image is required")
    .max(400, "password must be at most 400 characters"),
  content: string().required("Content is required"),
});



const NewBlogForm = ({ values, handleChange, handleBlur, errors, touched }) => {
  const { getBlogData } = useBlogCall();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.blog);

  

  

  useEffect(() => {
    getBlogData("categories");
  }, []);

  return (
    <Paper elevation={24} sx={{p:2,m:1,minWidth:"450px"}}>
    <Form>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          required
          id="title"
          type="text"
          label="Title"
          name="title"
          variant="outlined"
          value={values?.title || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
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
          value={values?.image || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.image && Boolean(errors.image)}
          helperText={touched.image && errors.image}
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
            value={values?.category || ""}
            // onChange={handleChange}
            onBlur={handleBlur}
            error={touched.category && Boolean(errors.category)}
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
          <FormHelperText id="my-helper-text" sx={{ color: "#D32F2F" }}>
            {touched.category && errors.category}
          </FormHelperText>
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
            value={values?.status || ""}
            // onChange={handleChange}
            onBlur={handleBlur}
            error={touched.status && Boolean(errors.status)}
          >
            <MenuItem value="">
              <em>Please Choose...</em>
            </MenuItem>

            <MenuItem value="d">Draft</MenuItem>
            <MenuItem value="p">Published</MenuItem>
          </Select>
          <FormHelperText id="my-helper-text" sx={{ color: "#D32F2F" }}>
            {touched.status && errors.status}
          </FormHelperText>
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
          value={values?.content || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
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
    </Form>
    </Paper>
  );
};

export default NewBlogForm;

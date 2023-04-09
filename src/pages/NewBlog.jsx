import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import useBlogCall from "../hooks/useBlogCall";
import NewBlogForm, {newBlogSheme } from "../components/blog/NewBlogForm";
import { FaBlog } from "react-icons/fa";


const NewBlog = () => {
  const { postBlogData } = useBlogCall();

  return (
    
      <Container component="main" maxWidth="xs" mb={10}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb:10
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <FaBlog />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Blog
          </Typography>
          <Formik
            initialValues={{
              title: "",
              content: "",
              category: "",
              image:"",
              status:"",

            }}
            validationSchema={newBlogSheme}
            onSubmit={(values, actions) => {
              console.log(values);
              postBlogData("blogs",values,"Blog")
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <NewBlogForm {...props} />}
          ></Formik>
        </Box>
      </Container>
   
  );
};

export default NewBlog;

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import { registerSheme } from "../components/auth/RegisterForm";
import useAuthCall from "../hooks/useAuthCall";
import RegisterForm from "../components/auth/RegisterForm";
import { Helmet } from "react-helmet";


const SignUp = () => {
  const { authOperation } = useAuthCall();

  return (
    
      <Container component="main" maxWidth="xs">
         <Helmet>
        <title>Register</title>
      </Helmet>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              image:"",
              bio:"",
              email: "",
              password: "",
            }}
            validationSchema={registerSheme}
            onSubmit={(values, actions) => {
              console.log(values);
              authOperation("register", {...values,password2:values.password});
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>
        </Box>
      </Container>
   
  );
};

export default SignUp;

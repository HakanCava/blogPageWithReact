import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import { loginSheme } from "../components/auth/LoginForm";
import useAuthCall from "../hooks/useAuthCall";
import LoginForm from "../components/auth/LoginForm";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const { authOperation } = useAuthCall();

  return (
    <Container component="main" maxWidth="xs">
       <Helmet>
        <title>Login</title>
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
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSheme}
          onSubmit={(values, actions) => {
            console.log(values);
            authOperation("login", values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <LoginForm {...props} />}
        ></Formik>
      </Box>
    </Container>
  );
};

export default SignIn;

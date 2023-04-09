import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Form } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const registerSheme = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "password must be at most 16 characters")
    .matches(/\d+/, "Password must include at least one number")
    .matches(/[a-z]/, "Password must include at least one small letter")
    .matches(/[A-Z]/, "Password must include at least one big letter")
    .matches(
      /[!,?{}><%&$*#£+-.]+/,
      "Password must include at least one special character"
    ),
    username: string()
    .required("Username is required")
    .min(1, "Username must be at least 1 characters")
    .max(150, "Username must be at most 150 characters")
   
});

const RegisterForm = ({ values, handleChange, handleBlur, errors, touched }) => {

    const navigate=useNavigate()
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Form>
      <Box sx={{ mt: 1 }}>
       

      <TextField
          margin="normal"
          fullWidth
          required
          id="username"
          type="text"
          label="Username"
          name="username"
          variant="outlined"
          value={values?.username || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
       
          margin="normal"
          fullWidth
          id="firstname"
          type="text"
          label="First Name"
          name="first_name"
          variant="outlined"
          value={values?.first_name || ""} //!register sayfasında initialValues un içinde
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.first_name && Boolean(errors.first_name)} //! name gore yazdik name="first_name"
          helperText={touched.first_name && errors.first_name}
        />
        <TextField
          margin="normal"
          fullWidth
          id="lastname"
          type="text"
          label="Last Name"
          name="last_name"
          variant="outlined"
          value={values?.last_name || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.last_name && Boolean(errors.last_name)}
          helperText={touched.last_name && errors.last_name}
        />
        <TextField
          margin="normal"
          fullWidth
          id="image"
          type="url"
          label="Image"
          name="image"
          variant="outlined"
          value={values?.image || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.image && Boolean(errors.image)}
          helperText={touched.image && errors.image}
        />
        <TextField
          margin="normal"
          fullWidth
          id="bio"
          type="text"
          label="Bio"
          name="bio"
          variant="outlined"
          value={values?.bio || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio && Boolean(errors.bio)}
          helperText={touched.bio && errors.bio}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        //   autoFocus
          value={values?.email || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        <FormControl sx={{ width: "100%" ,color:"red"}} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            // id="outlined-adornment-password"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            
            value={values?.password || ""}
         onChange={handleChange}
         onBlur={handleBlur}
         error={touched.password && Boolean(errors.password)}
        //  helpertext={touched.password && errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
           
          />
            <FormHelperText id="my-helper-text" sx={{color:"#D32F2F"}}>{touched.password && errors.password}</FormHelperText>
        </FormControl>

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
          loadingPosition="center"
        >
          Sign Up
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={()=>navigate("/login")} variant="body2" sx={{cursor:"pointer"}}>
              {"Do have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};

export default RegisterForm;

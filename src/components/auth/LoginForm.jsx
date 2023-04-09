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

export const loginSheme = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "password must be at least 8 characters")
    .max(16, "password must be at most 16 characters")
    .matches(/\d+/, "Password must include at least one number")
    .matches(/[a-z]/, "Password must include at least one small letter")
    .matches(/[A-Z]/, "Password must include at least one big letter")
    .matches(
      /[!,?{}><%&$*#£+-.]+/,
      "Password must include at least one special character"
    ),
});

const LoginForm = ({ values, handleChange, handleBlur, errors, touched }) => {
  const { loading } = useSelector((state) => state.auth);
  const navigate=useNavigate()

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
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={()=>navigate("/register")} variant="body2" sx={{cursor:"pointer"}} >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};

export default LoginForm;

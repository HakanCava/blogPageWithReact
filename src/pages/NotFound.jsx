import Typography  from "@mui/material/Typography";
import Box from "@mui/material/Box";
const NotFound = () => {
  return (
    <Box sx={{textAlign:"center"}}>
      <Typography variant="h1" color="error">404</Typography>
      <Typography variant="h3" color="error">Page is not found</Typography>
    </Box>
  );
};

export default NotFound;

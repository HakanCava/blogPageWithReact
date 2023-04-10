import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import useAuthCall from "../hooks/useAuthCall";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { FaBlog } from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function NavBar() {
  const { currentUser } = useSelector((state) => state.auth);
  const { authOperation } = useAuthCall();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static" sx={{bgcolor:theme.palette.primary.main,mb:2,}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "1.5rem",
            }}
          >
            {" "}
            <FaBlog />
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem  onClick={()=>{
                handleCloseNavMenu()
                navigate("/")
              }}>
                <Button >DASHBOARD</Button>
              </MenuItem>
              <MenuItem  onClick={()=>{
                handleCloseNavMenu()
                navigate("newblog")
              }}>
                <Button >new blog</Button>
              </MenuItem>
              <MenuItem  onClick={()=>{
                handleCloseNavMenu()
                navigate("about")
              }}>
                <Button >about</Button>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "1.5rem",
            }}
          >
            <FaBlog />
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={()=>{
                handleCloseNavMenu()
                navigate("/")
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              DASHBOARD
            </Button>
            <Button
              onClick={()=>{
                handleCloseNavMenu()
                navigate("/newblog")
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              NEW BLOG
            </Button>
            <Button
              onClick={()=>{
                handleCloseNavMenu()
                navigate("/about")
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ABOUT
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={currentUser?`HELLO ${currentUser.toUpperCase()}`:"Open Menu"}>
              <Avatar onClick={handleOpenUserMenu} sx={{bgcolor:currentUser?"#9c27b0":"white", p: 0,cursor:"pointer",color:"black"}}>
                {!currentUser&&<AccountCircleIcon sx={{color:"black"}} />}
                {currentUser&&<Typography sx={{fontSize:"1.5rem"}}> {currentUser.charAt(0).toUpperCase()}</Typography>}
              </Avatar>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                {!currentUser && <Button onClick={() => navigate("/register")}>Register</Button>}
                {!currentUser && (
                  <Button onClick={() => navigate("/login")}>Login</Button>
                )}
                {currentUser && <Button onClick={() => navigate("/myblog")}>My Blog</Button>}
                {currentUser && <Button onClick={() => navigate("/profile")}>Profile</Button>}
                {currentUser && (
                  <Button onClick={() => {
                    authOperation("logout","");
                    navigate("/");
                    }}>
                    Logout
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

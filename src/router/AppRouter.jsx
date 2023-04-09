import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyBlog from "../pages/MyBlog";
import { CssBaseline } from "@mui/material";
import Categories from "../pages/Categories";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
     <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="categories" element={<Categories />} />
          <Route path="newblog" element={<NewBlog />} />
          <Route path="myblog" element={<MyBlog />} />
          <Route />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;

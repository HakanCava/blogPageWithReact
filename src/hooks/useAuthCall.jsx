import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import {logoutBlogSuccess} from "../features/blogSlice"
import useAxios from "./useAxios";
import { toastSuccessNotify,toastErrorNotify } from "../helpers/ToastNotify";

// const {data}=await axiosWithToken.post(`account/`)

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosPublic } = useAxios();

  const authOperation = async (type, userInfo) => {
    console.log(type, userInfo);
    dispatch(fetchStart());
    try {
      if (type === "login") {
        console.log("loginde");
        const { data } = await axiosPublic.post(`users/auth/login/`, userInfo);
        console.log(data);
        dispatch(loginSuccess(data));
        navigate("/newblog");
      } else if (type === "logout") {
        console.log("logoutda");
        await axiosPublic.post(`users/auth/logout/`);
        dispatch(logoutSuccess());
        dispatch(logoutBlogSuccess());
      } else if (type === "register") {
        console.log("registerda");
        const { data } = await axiosPublic.post(`users/register/`, userInfo);
        dispatch(registerSuccess(data));
        navigate("/newblog");
      }
      toastSuccessNotify(`Success ${type}`);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`Login can not be performed`)
      dispatch(fetchFail());
    }
  };

  return { authOperation };
};

export default useAuthCall;

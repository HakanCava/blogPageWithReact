import { useSelector } from "react-redux";
import axios from "axios"

const useAxios = () => {
    const {token,currentUserID}=useSelector(state=>state.auth)

    const axiosPublic = axios.create({
        baseURL: "https://32197.fullstack.clarusway.com/",
      });


    const axiosWithToken = axios.create({
        baseURL: 'https://32197.fullstack.clarusway.com/',
        headers: {"Authorization": `Token ${token}`}
      });


    

  return {axiosWithToken,axiosPublic}
}

export default useAxios
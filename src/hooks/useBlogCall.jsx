import { useDispatch, useSelector } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getSuccess,getBlogDetailSuccess } from "../features/blogSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify"
import axios from "axios"


const useBlogCall = () => {
    const dispatch=useDispatch()
    const {axiosWithToken,axiosPublic}=useAxios()
    const {token,currentUserID}=useSelector(state=>state.auth)

    const getBlogData=async(url)=>{
        dispatch(fetchStart())
        try {
            const {data}=await axiosPublic(`api/${url}`)
            dispatch(getSuccess({data,url}))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail())
        }
    }
    const getBlogUniqData=async(baseUrl,ext,url)=>{
        dispatch(fetchStart())
        try {
            const {data}=await axiosWithToken(`api/${baseUrl}/${ext}`)
            dispatch(getSuccess({data,url}))
        } catch (error) {
            console.log(error);
            dispatch(fetchFail())
        }
    }


    // const getUserBlogData=async(url)=>{
    //     dispatch(fetchStart())
    //     try {
    //         const {data}=await axiosWithToken(`api/${url}`)
    //         dispatch(getUserBlogSuccess(data))
    //     } catch (error) {
    //         console.log(error);
    //         dispatch(fetchFail())
    //     }
    // }

    const postBlogData=async(url,info,title)=>{
        console.log(url);
        console.log(info);
        console.log(title);
        dispatch(fetchStart())
        try {
            await axiosWithToken.post(`api/${url}/`,info)
            toastSuccessNotify(`${title} successfuly posted`)
            getBlogData(url)
        } catch (error) {
            console.log(error)
            dispatch(fetchFail())
            toastErrorNotify(`${title} can not be posted`)
        }
    }


    const getLikeComment=async(url,id)=>{
        console.log("getLikeComment");
        console.log(url);
        console.log(id);
        dispatch(fetchStart())
        try {
          await axiosWithToken(`api/${url}/${id}/`)
            
        } catch (error) {
            dispatch(fetchFail())
        }
    }

//!Like  Post
    const postLikeComment=async(url,id,title,userID)=>{
        console.log("postLike");
        console.log(url);
        console.log(id);
        dispatch(fetchStart())
        try {
            await axiosWithToken.post(`api/${url}/${id}/`)
            getBlogData("blogs")
            getBlogUniqData("blogs",`?author=${userID}`,"userBlogs")
            getBlogUniqData("blogs",`${id}`,"blog")
           
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${title} can not be performed`)
        }

    }

    const postComment=async(url,id,title,userID,comment)=>{
        dispatch(fetchStart())
        try {
          
        await axiosWithToken.post(`api/${url}/${comment.post}/`,comment)
            getBlogData("blogs")
            getBlogUniqData("blogs",`?author=${userID}`,"userBlogs")
            getBlogUniqData("blogs",`${id}`,"blog")
           
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${title} can not be performed`)
        }

    }
    const putBlogCategory=async(url,id,title,userID,info)=>{
        dispatch(fetchStart())
        try {
          
        await axiosWithToken.put(`api/${url}/${id}/`,info)
            getBlogData("blogs")
            getBlogUniqData("blogs",`?author=${userID}`,"userBlogs")
            getBlogUniqData("blogs",`${id}`,"blog")
            toastSuccessNotify(`${title} successfuly updated`)
           
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${title} can not be updated`)
        }

    }

    const deleteBlogCategory=async(url,id,title)=>{
        dispatch(fetchStart())
        try {
            await axiosWithToken.delete(`api/${url}/${id}/`)
            toastSuccessNotify(`${title} successfuly deleted`)
            // getBlogData("blogs")
            getBlogData(url);
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(`${title} can not be deleted`)
        }
    }


  return {getBlogData,postBlogData,getBlogUniqData,postLikeComment,getLikeComment,postComment,deleteBlogCategory,putBlogCategory}
}

export default useBlogCall
import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, getSuccess } from "../features/blogSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify"



const useBlogCall = () => {
    const dispatch=useDispatch()
    const {axiosWithToken,axiosPublic}=useAxios()
    

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


//!Like  Post
    const postLikeComment=async(url,id,title,userID,comment)=>{
        console.log("like and comment");
       
        dispatch(fetchStart())
        try {
            comment?(await axiosWithToken.post(`api/${url}/${comment.post}/`,comment)):
            (await axiosWithToken.post(`api/${url}/${id}/`))
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
            getBlogData(url)
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


  return {getBlogData,postBlogData,getBlogUniqData,postLikeComment,deleteBlogCategory,putBlogCategory}
}

export default useBlogCall
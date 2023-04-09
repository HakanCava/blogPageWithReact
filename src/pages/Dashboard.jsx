import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useBlogCall from '../hooks/useBlogCall'
import BlogCard from '../components/blog/BlogCard'

const Dashboard = () => {
  const {blogs}=useSelector(state=>state.blog)

const {getBlogData}=useBlogCall()
  useEffect(()=>{
    getBlogData(`blogs`)
    
  },[])
 
  return (
    <Grid container sx={{justifyContent:"center",gap:2,mb:10}}>
      {blogs?.map((blog)=>(
        <Grid item key={blog.id}>
          <BlogCard blog={blog}/>
        </Grid>
      ))}
      
    </Grid>
  )
}

export default Dashboard
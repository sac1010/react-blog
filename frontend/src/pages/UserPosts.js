import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCards from '../components/BlogCards'

export const UserPosts = () => {
    const [blogs, setBlogs] = useState([])
    const {userId} = useParams()
    useEffect(()=>{
        axios.get(`https://blog-backend-react.herokuapp.com/blogs/user/${userId}`).then((res)=>{
            setBlogs(res.data)
        })
    },[userId])
  return (
    <div>
        <div style={{margin:"0 auto", marginTop:"100px", width:"70%", display:"flex", flexWrap:"Wrap", gap:"20px", justifyContent:"space-around", alignItems:"center"}}>
        {blogs.length==0?<h2>YOU HAVEN'T POSTED YET! </h2>:blogs.map((el)=>{
            return(
                <BlogCards {...el}></BlogCards>
            )
        })}
        </div>

        
    </div>
  )
}

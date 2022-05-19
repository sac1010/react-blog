import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCards from '../components/BlogCards'
import { Cat } from '../components/Cat'
import "./blog.css"

export const Blog = () => {
  const [blog,setBlog] = useState({})
  const [related, setRelated] = useState([])
  const {id} = useParams()

  useEffect(()=>{
    getData(id)        
  },[id])

  const getData = async(id)=>{
    try{
      const blogData = await axios.get(`https://blog-backend-react.herokuapp.com/blogs/blog/${id}`)
      const related =await axios.get(`https://blog-backend-react.herokuapp.com/blogs?category=${blogData.data.category}`)
      setBlog(blogData.data)  
           
      setRelated(related.data.filter((el)=>el.id!=id))
    }
    catch(err){
      console.log(err)
    }



  }
  return (
    <div className='blog' >
      <h2>{blog.title}</h2>
      <Cat category={blog.category}></Cat>
      <span>{blog.date}</span> 
      <img className='blog-img' src={blog.imgUrl} alt="" />
      <p>{blog.description}</p>
      <hr />
      <br />
      {related.length>0?<div>
      <h2>Related posts</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {related.map((el)=>{
          return(
            <BlogCards {...el}></BlogCards>
          )
        })}
      </div>
      </div>:""
    }

    </div>
  )
}

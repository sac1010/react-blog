import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BlogCards from '../components/BlogCards'
import { Cat } from '../components/Cat'
import Comment from '../components/Comment'
import { setLoading } from '../redux/actions'
import "./blog.css"

export const Blog = () => {
  const [blog,setBlog] = useState({})
  const [related, setRelated] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const {id} = useParams()

  useEffect(()=>{
    getData(id)        
  },[id])
  const dispatch = useDispatch()
  const getData = async(id)=>{
    dispatch(setLoading(true))
    try{
      const blogData = await axios.get(`https://blog1010.herokuapp.com/blogs/blog/${id}`)
      const related =await axios.get(`https://blog1010.herokuapp.com/blogs?category=${blogData.data.category}`)
      const comments = await axios.get(`https://blog1010.herokuapp.com/comments/${id}`)
      console.log(comments.data)
      setBlog(blogData.data)  
      setComments(comments.data)     
      setRelated(related.data.blogs.filter((el)=>el.id!=id))
      dispatch(setLoading(false))
    }
    catch(err){
      console.log(err)
    }
  }
  const userId = useSelector((state)=>state.userId)
  const addComment = ()=>{
    const body = {
      userId:userId,
      postId:id,
      comment:newComment
    }
    axios.post(`https://blog1010.herokuapp.com/comments`, body).then((res)=>{
      console.log(res.data)
      getData(id)
    }).catch((err)=>{
      toast.error("please sign in")
    })
  }
  return (
    <div className='blog' >
      <h2>{blog.title}</h2>
      <div style={{ width:"100%", display:"flex", justifyContent:"center"}}><Cat category={blog.category}></Cat></div>
      
      <span>{blog.date}</span> 
      <img className='blog-img' src={blog.imgUrl} alt="" />
      <p>{blog.description}</p>
      <hr />
      <br />
      <h2>Comments</h2>
      <textarea onChange={(e)=>setNewComment(e.target.value)} placeholder='add new comment' name="" id="" cols="60" rows="6"></textarea><br />
      <button onClick={addComment}>add comment</button>
      {comments.map((el)=>
        <Comment {...el}></Comment>
      )}
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

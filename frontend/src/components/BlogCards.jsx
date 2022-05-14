import React, { useEffect, useState } from 'react'
import "./BlogCards.css"
import { Cat } from './Cat'
import { Link, useNavigate} from 'react-router-dom' 
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import axios from 'axios';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {toast} from "react-toastify"

const BlogCards = ({imgUrl, description, category, title, _id, loggedId, userId}) => {
 const [liked, setLiked] = useState(false)
 const [likeCount, setLikeCount] = useState(0)

 useEffect(()=>{
  loggedId && axios.get(`http://localhost:3001/likes/isLiked/${loggedId}/${_id}`).then((res)=>{
    setLiked(res.data.liked)
    console.log(loggedId)
  })
  axios.get(`http://localhost:3001/likes/${_id}`).then((res)=>{
    setLikeCount(res.data.likes)
  })
 },[])
 const navigate = useNavigate()

 const handleLike = (e)=>{
   e.preventDefault()
   const body ={
     userId:loggedId,
     postId:_id
   }
   if(!loggedId){
    toast.error("please login to like posts")
    return;
   }
   setLiked(!liked)
  axios.post(`http://localhost:3001/likes/like`, body).then((res)=>{
    toast.success("post Liked")
    setLikeCount(res.data.likes)
    
  })
 }

 const descFix = (description)=>{
   let newDesc
    if(description.length>100){
      newDesc = description.slice(0,100)+"..."
    }
    return newDesc
  }
 
  let desc = descFix(description)
 
  return (
    
    <div className='card'>
      <Link to={`/blog/${_id}`}>
      <img className='image' src={imgUrl} alt="img" />
      <div className='cardContent'>
      <h3>{title}</h3>
      <div>
      <span>{desc}</span>
      <span>read more</span>
      </div>
      <div style={{margin:"auto"}}>
      <Cat category={category}></Cat>
      </div>
      <div style={{display:"flex", justifyContent:"space-around", width:"100%"}}>
      {userId==loggedId?<div className='icons'>
        <Link to={`/edit/${_id}`}>
        <EditIcon  fontSize='small'></EditIcon>
        </Link>
      
      <DeleteOutlineIcon fontSize='small'></DeleteOutlineIcon>
      </div>:""}
      <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
      {liked?<ThumbUpIcon onClick={handleLike}></ThumbUpIcon>:<ThumbUpOutlinedIcon onClick={handleLike}></ThumbUpOutlinedIcon>} 
     <h4>{likeCount}</h4>
      </div>

      </div>
      
      </div>
      </Link>
    </div>
    
  )
}

export default BlogCards
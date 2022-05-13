import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {toast, ToastContainer} from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

export function AddEdit() {
  const token = localStorage.getItem("token") || ""
  const initState = {
    title:"",
    description:"",
    category:"",
    imgUrl:"",
    date:""
  }
  const navigate = useNavigate()
  const [err, seterr] = useState(false)
  const{id} = useParams()

   const handleInput = (e)=>{
    setBlog(
      {...blog,
      [e.target.id]:e.target.value}
    )
    console.log(blog)
   }
   const handleFile = (files)=>{
    // qlruhrhr
    console.log(files)
    const formData = new FormData()
    formData.append("file", files)
    formData.append("upload_preset", "qlruhrhr" )
    axios.post("http://api.cloudinary.com/v1_1/dcmid4z9m/image/upload", formData).then((res)=>{
      console.log(res.data.url)
      setBlog({
        ...blog,
        imgUrl:res.data.url
      })
      toast.info("image uploaded successfully")
    }).catch((err)=>{
      toast.error("something went wrong")
      console.log(err)
    })

   }

   const getDate = ()=>{
     const today = new Date()
     let dd = String(today.getDate()).padStart(2, "0")
     let mm = String(today.getMonth()+1).padStart(2, "0")
     let yyyy = String(today.getFullYear())
     return dd+"/"+mm+"/"+yyyy
   }
   const addBlog = async()=>{
     if(blog.title && blog.description && blog.category){
       let curDate = getDate()
       console.log(curDate)    
      try{
       const edBlog =  {
          ...blog,
          date:curDate
        }
     const res = await axios.post("http://localhost:3001/blogs", edBlog, { headers: {"Authorization" : `Bearer ${token}`} })        
           toast.success("success")
          navigate("/")
      }catch{
        toast.error("something went wrong")
      }
     }
     else{
       seterr(true)
     }
     
   }
  const options = ["travel", "movie", "technology", "sports", "food", "fashion"]
  const [blog, setBlog] = useState(initState)
  return (
    
      <div style={{width:"30%", margin:"auto", display:"flex", flexDirection:"column", marginTop:"70px"}}>
        <ToastContainer></ToastContainer>
        <h1 style={{margin:"auto"}}>{id?"edit blog":"create blog"}</h1>
      <TextField id="title" label="Title" onChange={handleInput} variant="standard" value={blog.title}/><br />
      <textarea id="description" value={blog.description} label="Description" onChange={handleInput} placeholder='description' cols="30" rows="10"></textarea>
      
      <div style={{margin:"20px"}}>
      add image: <input onChange={(e)=>{handleFile(e.target.files[0])}} type="file" />
      </div>
      
      <select id="category" value={blog.category} style={{marginBottom:"20px", height:"40px"}} className='category' onChange={handleInput} >
        <option value={""} >select category</option>
      {options.map((el, index)=>{
        return(
          <option key={index} value={el}>{el}</option>
        )
      })}
      </select>
      <Button onClick={addBlog} variant="contained">add blog</Button>
      {err?<div style={{color:"red"}}>please fill required fields</div>:""}
      </div>
  );
}

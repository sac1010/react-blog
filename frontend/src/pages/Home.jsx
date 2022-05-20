import React, { useEffect, useState } from 'react'
import {toast, ToastContainer} from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import BlogCards from '../components/BlogCards';
import "./home.css"
import { Recent } from '../components/Recent';
import jwt_decode from "jwt-decode";
import Pagination from '@mui/material/Pagination';



export const Home = () => {
  const [data, setData] = useState([])
  const [recent, setRecent] = useState([])
  const [pages, setPages] = useState("")
  const [curPage, setCurPage] = useState(1)
  useEffect(()=>{
    axios.get(`https://blog1010.herokuapp.com/blogs?page=${curPage}`).then((res)=>{
    setData(res.data.blogs)
    setPages(res.data.pages)
    })
  },[curPage])

  useEffect(()=>{
    axios.get(`https://blog1010.herokuapp.com/blogs/last`).then((res)=>{
      setRecent(res.data)
    })
  }, [])

  const filterCat = (e)=>{
    const category = e.target.id
      axios.get(`https://blog1010.herokuapp.com/blogs?category=${category}`).then((res)=>{
        setData(res.data.blogs)
      })
  }
  
const pageChange = (e)=>{
  setCurPage(e.target.textContent)
}

  const options = ["travel", "movie", "technology", "sports", "food", "fashion"]

  return (
    <div className='container'>
      <div className='blogs'>
      {data.map((el)=>{
        return(
          <BlogCards key={el.id} title={el.title} description={el.description} _id={el._id} imgUrl={el.imgUrl} category={el.category} userId={el.userId} ></BlogCards>
        )
      })}
      <Pagination onChange={pageChange} style={{margin:"20px"}} count={pages} color="primary" />
      </div>
      <div className='right-panel'>
        <div className='recent-posts'>
          <h3>Recent Posts</h3>
           {recent.map((el)=>{
             return(
               <Recent {...el}></Recent>
             )
           })}
        </div>
        <div className='category-filter'>
          <h3>CATEGORIES</h3>
            {options.map((el, i)=>{
              return(
                <div key={i} id={el} onClick={filterCat}>{el}</div>
              )
            })}
        </div>
      </div>
      
    </div>
  )
}

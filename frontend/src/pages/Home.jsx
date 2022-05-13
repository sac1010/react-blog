import React, { useEffect, useState } from 'react'
import {toast, ToastContainer} from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import BlogCards from '../components/BlogCards';
import "./home.css"
import { Recent } from '../components/Recent';





export const Home = () => {
  const [data, setData] = useState([])
  const [recent, setRecent] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/blogs").then((res)=>{
    setData(res.data)
    })
  },[])

  useEffect(()=>{
    axios.get(`http://localhost:3001/blogs/last`).then((res)=>{
      setRecent(res.data)
    })
  }, [])

  const filterCat = (e)=>{
    const category = e.target.id
      axios.get(`http://localhost:3001/blogs?category=${category}`).then((res)=>{
        setData(res.data)
      })
  }

  const options = ["travel", "movie", "technology", "sports", "food", "fashion"]

  return (
    <div className='container'>
      <div className='blogs'>
      {data.map((el)=>{
        return(
          <BlogCards key={el.id} {...el}></BlogCards>
        )
      })}
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
            {options.map((el)=>{
              return(
                <div id={el} onClick={filterCat}>{el}</div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

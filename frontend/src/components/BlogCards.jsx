import React from 'react'
import "./BlogCards.css"
import { Cat } from './Cat'
import { Link, useNavigate} from 'react-router-dom' 
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BlogCards = ({imgUrl, description, date, category, title, _id}) => {
 const navigate = useNavigate()
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
      <div className='icons'>
        <Link to={`/edit/${_id}`}>
        <EditIcon  fontSize='small'></EditIcon>
        </Link>
      
      <DeleteOutlineIcon fontSize='small'></DeleteOutlineIcon>
      </div>
      
      </div>
      </Link>
    </div>
    
  )
}

export default BlogCards
import React from 'react'
const moment = require('moment');

const Comment = ({comment, userId, createdAt}) => {
    var formatted_date = moment(createdAt).format('YYYY-MM-DD')
    console.log(formatted_date)
  return (
    <div style={{margin:"auto",height:"70px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", marginTop:"10px"}}>
        <div style={{fontSize:"12px"}}> <span>posted by:</span> <span> {userId.firstName+" "+userId.lastName}</span> </div>
        {comment}
        <div style={{fontSize:"12px"}} >{formatted_date}</div>
    </div>
  )
}

export default Comment
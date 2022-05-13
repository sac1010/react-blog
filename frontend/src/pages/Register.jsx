import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate()
    const [regData, setRegData] = useState({})
    const handleChange = (e)=>{
        setRegData({
            ...regData,
            [e.target.name]:e.target.value
        })
    }
    const register = ()=>{
        axios.post("http://localhost:3001/register", regData).then((res)=>{
        toast.success("registration successful ")
        navigate("/")
        })
    }
  return (
    <div style={{marginTop:"100px", textAlign:"center"}}>
        <h1>Register</h1>
        <TextField name='firstName' onChange={handleChange} label="First Name"></TextField><br /><br />
        <TextField name='lastName' onChange={handleChange} label="last Name"></TextField><br /><br />
        <TextField name='email' onChange={handleChange} label="email"></TextField><br /><br />
        <TextField name='password' type="password" onChange={handleChange} label="Password"></TextField><br /><br />
        <Button onClick={register}>Register</Button>
    </div>
  )
}

import './App.css';
import {Routes, Route} from "react-router-dom"
import { Home } from './pages/Home.jsx';
import { Blog } from './pages/Blog';
import { AddEdit } from './pages/AddEdit';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import {toast, ToastContainer} from "react-toastify"
import { Register } from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { UserPosts } from './pages/UserPosts';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const loading = useSelector((state)=>state.loading)
  
  
  return (
    <div >
      <ToastContainer></ToastContainer>
      <div className='navfix'>
      <Navbar ></Navbar>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/blog/:id' element={<Blog></Blog>}></Route>
        <Route path='/addBlog' element={<AddEdit></AddEdit>}></Route>
        <Route path='/edit/:id' element={<AddEdit></AddEdit>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/blogs/user/:userId' element={<UserPosts></UserPosts>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

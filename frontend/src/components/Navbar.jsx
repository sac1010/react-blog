import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify"
import jwt_decode from "jwt-decode";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function Navbar() {

  const navigate = useNavigate()
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [token, setToken] = React.useState(localStorage.getItem("token") || "")
    let loggedIn = ""
    if(token){
     loggedIn = jwt_decode(token)
    }




  const LoginModal = ()=>{
    const [loginData, setLoginData] = React.useState({})
    const handleChange = (e)=>{
      setLoginData({
        ...loginData,
        [e.target.name]:e.target.value
      })
    }

    const handleLogin =()=>{
      axios.post("http://localhost:3001/login",loginData).then((res)=>{
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
        toast.success("Login successful")
        setOpen(false)
      }).catch((err)=>{
        console.log(err.message)
        toast.error("invalid username or password")
        
      })
    }
      return(
        <Box style={{textAlign:"center"}} sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
         Login
        </Typography>
        <TextField name='email' onChange={handleChange}  label="email"></TextField>
        <TextField name='password' type="password" onChange={handleChange} style={{marginTop:"10px"}} label="password"></TextField><br />
        <Button onClick={handleLogin} style={{marginTop:"10px"}}  type='contained'>Login</Button><br />
        <Typography variant="h9" onClick={()=>setOpen(false)}> <Link to={"/register"}>don't have an account?</Link>  </Typography><br />
        <Typography variant="h9"  onClick={()=>setOpen(false)}> <Link to={"/register"}>signup here</Link> </Typography>
      </Box>
      )
  }

  const LogoutModal = ()=>{
    return(
      <Box style={{textAlign:"center"}} sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
       Logout
      </Typography>
      <Button onClick={()=>{
        setToken("")
        localStorage.removeItem("token")
      }} style={{marginTop:"10px"}}  type='contained'>Logout</Button><br />

    </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
          onClick={()=>{
            
          }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          > <Link to={`/`}>
            BLOG
          </Link>
          </Typography>
            <div style={{display:"flex" ,gap:"30px"}}>
 
          <Typography style={{cursor:"pointer"}} onClick={()=>{
            token?navigate("/addBlog"):toast.info("Login to add post")
          }}>              
                Add Post
          </Typography>
          <Typography style={{cursor:"pointer"}} onClick={()=>{
            token?navigate(`/blogs/user/${loggedIn.user._id}`):toast.info("Login to add post")
          }}>              
                Your Posts
          </Typography>
          <Typography>
          <Link to={`/about`}>
                about
              </Link>
          </Typography>
            </div>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Typography onClick={handleOpen} style={{marginLeft:"10px", cursor:"pointer"}}>{token?loggedIn.user.firstName:"Login"}</Typography>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {token?<LogoutModal></LogoutModal>:<LoginModal ></LoginModal>}
        
      </Modal>
    </Box>
  );
}

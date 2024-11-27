import React, { useState } from "react";
import '../Login/login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const  [userName, setUserName]=useState('');
    const [password, setPassword] = useState('');
    const Navigate=useNavigate()

    const[isLoading,setLoading]=useState(false);

    const submiHandler=(event)=>{
        event.preventDefault();
        setLoading(true);
        console.log(userName,password)
        axios.post('https://blogapi-7.onrender.com/auth/admin/login',{
            userName:userName,
            password:password
        })
        .then(res=>{
            setLoading(false);
            console.log(res.data)
            localStorage.setItem('email',res.data.email);
            localStorage.setItem('fullName',res.data.fullName);
            localStorage.setItem('token',res.data.token);
            Navigate('/admin/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="loginContainer">
            <form onSubmit={submiHandler} className="loginBox">
                <img alt="linkedin" className="linkedIn" src={require('../../assets/linkedIn.png')}/>
                <h1 align="center">Login</h1>
                <input onChange={(e)=>setUserName(e.target.value)} placeholder="username"/>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"/>
                <button className="submitBtn">{isLoading && <CircularProgress size={18} color="inherit"/>}<span style={{marginLeft:'10px'}} >Submit</span></button>
            </form>
        </div>
    )
}
export default Login
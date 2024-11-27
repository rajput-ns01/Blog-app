import React, { useState } from "react";
import '../UserLogin/userLogin.css'; // Ensure this CSS file is consistent with the signup page
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const UserLogin = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post('https://blogapi-7.onrender.com/auth/user/login', { 
            email,
            password
        })
        .then(res => {
            setLoading(false);
            console.log(res.data);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('fullName', res.data.fullName);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('imageUrl',res.data.imageUrl);
            navigate('/home');
        })
        .catch(err => {
            setLoading(false);
            console.log('Error during login:', err);
        });
    }

    return (
        <div className="loginContainer">
            <form onSubmit={submitHandler} className="loginBox">
                <h1 align="center">Login</h1>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                />
                <button type="submit" className="submitBtn">
                    {isLoading && <CircularProgress size={18} color="inherit" />}
                    <span style={{ marginLeft: '10px' }}>Submit</span>
                </button>
                <div className="loginFooter">
                    <p>Don't have an account? <a href="/signUp" className="signinLink">Sign Up</a></p>
                </div>
            </form>
        </div>
    );
}

export default UserLogin;

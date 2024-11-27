import React, { useState } from 'react';
import '../NavBar/navBar.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('fullName');
        localStorage.removeItem('token');
        localStorage.removeItem('imageUrl');

        // Redirect to login page
        navigate('/login');
    };

    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem('token');
    const userName = localStorage.getItem('fullName');
    const userImage = localStorage.getItem('imageUrl');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='nav-bar'>
            <div>
                <p className='my-logo'><span className='logo'>Nirbhay</span> Blog App</p>
            </div>
            <div className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <Link className='links' to='/home'>Home</Link>
                <Link className='links' to='/blog'>Blog</Link>
                {isLoggedIn ? (
                    <div className='user-info'>
                        <img src={userImage} alt="User Profile" className='user-image' />
                        <span className='user-name'>{userName}</span>
                        <button className='logoutBtn' onClick={handleLogout}>Log Out</button>
                    </div>
                ) : (
                    <Link className='links login' to='/login'>SignUp/Login</Link>
                )}
            </div>
        </div>
    );
}

export default NavBar;

import React from "react";
import '../Dashboard/dashboard.css';
import { Link, Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.clear();
        navigate('/admin/login');
    }
    return(
        <div className="container">
            <div className="sideNav">
                <div className="logoContainer">
                    <img alt="logo" className="logo" src={require('../../assets/linkedIn.png')}/>
                    <h1 className="logo-heading">hello</h1>
                    <button onClick={logoutHandler} style={{border:'none',padding:'5px',borderRadius:'5px'}} >Logout</button>
                </div>

                <Link to='/admin/dashboard' style={{backgroundColor:'orange'}} className="link"><DashboardIcon/><span style={{marginLeft:'10px'}}>Dashboard</span></Link>
                <Link to='/admin/dashboard/blog' className="link"><PlaylistAddCheckIcon/><span style={{marginLeft:'10px'}}>Blog List</span></Link>
                <Link to='/admin/dashboard/add-blog' className="link"><AddBoxIcon/><span style={{marginLeft:'10px'}}>Add Blog</span></Link>
                <Link to='/admin/dashboard/category' className="link"><CategoryIcon/><span style={{marginLeft:'10px'}}>Category List</span></Link>
                <Link to='/admin/dashboard/add-category' className="link"><PlaylistAddIcon/><span style={{marginLeft:'10px'}}>Add Category</span></Link>
                <Link to='/admin/dashboard/comment' className="link"><LogoutIcon/><span style={{marginLeft:'10px'}}>Comments</span></Link>

            </div>
            <div className="mainContent">
                <Outlet/>
            </div>
        </div>
    )
}
export default Dashboard
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../CategoryList/categoryList.css';
import { app } from "../../firebase";
import { deleteObject, getStorage , ref as storageRef} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const BlogList = ()=>{

    const[blogs,setBlogs]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        getBlogs();
    },[])

    const getBlogs = ()=>{
        axios.get('https://blogapi-7.onrender.com/blog')
        .then(res=>{
            console.log(res.data.blog)
            setBlogs(res.data.blog.reverse())
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteBlog=(blogData)=>{
        if(window.confirm("Are you sure you want to delete ?"))
        {
            const storage = getStorage(app)
            const myRef = storageRef(storage,`${blogData.imageUrl}`);
            deleteObject(myRef)
            .then(result=>{
                axios.delete('https://blogapi-7.onrender.com/blog/'+blogData._id,{
                    headers:{
                        Authorization:'Bearer '+localStorage.getItem('token')
                    }
                })
            .then(res=>{
                console.log(res)
                getBlogs()
            })
            .catch(err=>{
                console.log(err)
            })
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
    return(
        <div>
            {blogs.map(data=>(
                <div className="card" key={data._id}>
                    <div style={{width:'25%'}}>
                    <p>{data.title}</p>
                    </div>
                    <div style={{width:'25%'}}>
                    <img className="cat-image" style={{height:'100px'}} src={data.imageUrl}/>
                    </div>
                    <div style={{width:'25%'}}>
                    <button onClick={()=>{navigate('/admin/dashboard/edit-blog',{state:{myData:data}})}} style={{backgroundColor:'rgb(39, 9, 208)'}} className="smBtn">Edit</button>
                    </div>
                    <div style={{width:'25%'}}>
                    <button onClick={()=>{deleteBlog(data)}} style={{backgroundColor:'red'}} className="smBtn">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BlogList
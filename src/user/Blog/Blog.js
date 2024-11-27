import React, { useEffect, useState } from 'react'
import '../Blog/blog.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Blog=()=>{
    const [category,setCategory]=useState([])
    const[blog,setBlog]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
        getCategory();
        getBlog();
    },[])

    const getCategory=()=>{
        axios.get('https://blogapi-7.onrender.com/category')
        .then(res=>{
            console.log(res)
            setCategory(res.data.category)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getBlog=()=>{
        axios.get('https://blogapi-7.onrender.com/blog')
        .then(res=>{
            console.log(res)
            setBlog(res.data.blog)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getBlogByCat=(cat)=>{
        axios.get(`https://blogapi-7.onrender.com/blog/category/${cat}`)
        .then(res=>{
            console.log(res)
            setBlog(res.data.blog)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <div className='main-container'>
            <div className='blogs-container'>
            {blog.map(data => (
                    <div 
                        key={data.id} 
                        className='blog-box' 
                        onClick={() => {console.log('Blog ID:', data._id);navigate(`/blog-detail/${data._id}`)  }}
                    >
                        <img className='b-image' src={data.imageUrl} alt={data.title} />
                        <p className='b-category'>{data.category}</p>
                        <h2 className='b-title'>{data.title}</h2>
                    </div>
                ))}
            </div>
            <div className='c-container'>
                <h3>All Category</h3>
                <div className='categories'>
                    <button className='c-button' onClick={getBlog}>All Category List</button>
                    {category.map(data=>(
                        <div>
                            <button onClick={()=>getBlogByCat(data.name)} className='c-button'>{data.name}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blog
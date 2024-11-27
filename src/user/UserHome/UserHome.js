import React, { useEffect, useState } from 'react'
import '../UserHome/userHome.css';
import axios from 'axios';
import Footer from '../Footer/Footer';

const UserHome=()=>{
    const [category,setCategory]=useState([])
    const[blog,setBlog]=useState([])

    useEffect(()=>{
        getCategory();
        getBlog();
    },[])

    const getCategory=()=>{
        axios.get('https://blogapi-7.onrender.com/category/latest-category/4')
        .then(res=>{
            console.log(res)
            setCategory(res.data.Category)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getBlog=()=>{
        axios.get('https://blogapi-7.onrender.com/blog/latest-post/4')
        .then(res=>{
            console.log(res)
            setBlog(res.data.Blog)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return(
        <div>
            {/*---------banner------------ */}
            <div className='banner'>
                <div style={{width:'50%'}}>
                    <img className='developer-image' src={require('../../assets/github.jpeg')}/>
                </div>
                <div style={{width:'50%'}}>
                    <p className='welcome'>Welcome to</p>
                    <h1 className='nirbhay-heading'>Nirbhay Online Blog</h1>
                </div>
            </div>

            {/*-----------------top category---- */}

            <h1 className='heading'>Latest Category</h1>
            <div className='category-container'>
                {category.map(data=>(
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'25%',alignItems:'center'}}>
                        <img className='category-image' src={data.imageUrl}/>
                        <p className='category-title'>{data.name}</p>
                    </div>
                ))}
            </div>

            {/*--------------------latest post----------------- */}
            <h1 className='heading'>Latest Blog</h1>
            <div className='blog-container'>
            {
                blog.map(data=>(
                    <div className='blog'>
                        <img className='blog-image' src={data.imageUrl}/>                     
                        <p className='blog-category'>{data.category}</p>
                        <h2 className='blog-title'>{data.title}</h2>
                    </div>
                ))
            }
            </div>
            <Footer/>
        </div>
    )
}

export default UserHome
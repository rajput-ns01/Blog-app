import axios from "axios";
import React, { useEffect, useState } from "react";
import '../CategoryList/categoryList.css';
import { app } from "../../firebase";
import { deleteObject, getStorage , ref as storageRef} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const CategoryList = ()=>{

    const[category,setCategory]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        getCategory();
    },[])

    const getCategory = ()=>{
        axios.get('https://blogapi-7.onrender.com/category')
        .then(res=>{
            console.log(res.data.category)
            setCategory(res.data.category)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteCategory=(categoryData)=>{
        if(window.confirm("Are you sure you want to delete ?"))
        {
            const storage = getStorage(app)
            const myRef = storageRef(storage,`${categoryData.imageUrl}`);
            deleteObject(myRef)
            .then(result=>{
                axios.delete('https://blogapi-7.onrender.com/category/'+categoryData._id)
            .then(res=>{
                console.log(res)
                getCategory()
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
            {category.map(data=>(
                <div className="card" key={data._id}>
                    <div style={{width:'25%'}}>
                    <p>{data.name}</p>
                    </div>
                    <div style={{width:'25%'}}>
                    <img className="cat-image" style={{height:'100px'}} src={data.imageUrl}/>
                    </div>
                    <div style={{width:'25%'}}>
                    <button onClick={()=>{navigate('/admin/dashboard/edit-category',{state:{myData:data}})}} style={{backgroundColor:'rgb(39, 9, 208)'}} className="smBtn">Edit</button>
                    </div>
                    <div style={{width:'25%'}}>
                    <button onClick={()=>{deleteCategory(data)}} style={{backgroundColor:'red'}} className="smBtn">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CategoryList
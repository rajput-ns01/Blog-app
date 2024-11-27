import axios from "axios";
import React, { useEffect, useState } from "react";
import '../CommentList/comment.css';

const CommentList = ()=>{

    const[comments,setComments]=useState([]);

    useEffect(()=>{
        getComment();
    },[])

    const getComment = ()=>{
        axios.get('https://blogapi-7.onrender.com/comment')
        .then(res=>{
            console.log(res.data.comments)
            setComments(res.data.comments)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteComment=(commentId)=>{
        if(window.confirm("Are you sure you want to delete ?"))
        {
            axios.delete('https://blogapi-7.onrender.com/comment/'+commentId)
            .then(res=>{
                console.log(res)
                getComment()
            })
            .catch(err=>{
                console.log(err)
            })
            
        }
    }

   
    return(
        <div className="comment-container">
            {comments.map(data=>(
                <div className="comment-card" key={data._id}>
                    <div style={{width:'25%'}}>
                    <div style={{width:'250px' ,height:'100px',alignItems:'center',display:'flex',justifyContent:'space-between'}}>
                    <p style={{width:'250px'}} >{data.email}</p>
                    <button onClick={()=>{deleteComment(data._id)}} style={{border:'none',width:'70px',height:'30px',borderRadius:'5px',backgroundColor:'red',color:'white'}}>Delete</button>
                    </div>
                    <p style={{width:'250px'}} >{data.commentText}</p>
                    <p style={{width:'250px'}} >{data.timestamp}</p>
                    </div>          
                </div>
            ))}
        </div>
    )
}

export default CommentList
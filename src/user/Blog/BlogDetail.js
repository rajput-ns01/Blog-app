import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './blogDetail.css'; // Import the CSS file
import CircularProgress from '@mui/material/CircularProgress';


const BlogDetail = () => {
  const { blogId } = useParams(); // Retrieve blogId from the route parameter
  const [blog, setBlogDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const[isLoading,setLoading]=useState(false);


  useEffect(() => {
    if (blogId) {
      getBlogDetail();
      getCommentDetail();

    }
  }, [blogId]);

  const getBlogDetail = () => {
    axios
      .get(`https://blogapi-7.onrender.com/blog/${blogId}`)
      .then((res) => {
        setBlogDetail(res.data.blog[0]);
      })
      .catch((err) => {
        console.log('Error fetching blog details:', err);
      });
  };

  const getCommentDetail = () => {
    axios
      .get(`https://blogapi-7.onrender.com/comment/${blogId}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log('Error fetching comments:', err);
      });
  };

  const handleCommentSubmit = () => {
    setLoading(true);
    const myemail = localStorage.getItem('email');
    const imageUrl = localStorage.getItem('imageUrl');
    const fullName = localStorage.getItem('fullName');

    if (!myemail) {
      console.error('No email found in localStorage');
      return; // Exit the function if email is not found
    }

    axios
      .post(`https://blogapi-7.onrender.com/comment`, {
        blogId,
        commentText: newComment,
        email: myemail,
        imageUrl,
        fullName
      })
      .then((res) => {
        setLoading(false);
        setComments([...comments, res.data.comment]);
        setNewComment(''); // Clear the input field after submission
      })
      .catch((err) => {
        console.log('Error submitting comment:', err);
      });

  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  if (!blog) return <div>Loading...</div>; // Show loading state while fetching

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p>{blog.category}</p>
      <img src={blog.imageUrl} alt={blog.title} />
      <div dangerouslySetInnerHTML={{ __html: blog.description }} />

      <div className="comments-section">
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit" >{isLoading && <CircularProgress size={18} color="inherit"/>}Submit Comment</button>
        </form>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                {comment.imageUrl && (
                  <img src={comment.imageUrl} alt={`${comment.fullName}'s avatar`} />
                )}
                <div>
                  <strong>{comment.email || 'Anonymous'}:</strong> {comment.commentText || 'No comment text provided'}
                  <p>{comment.fullName || 'No full name provided'}</p>
                  <p className='comment-timestamp'>{formatDate(comment.timestamp)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

      </div>
    </div>

  );
};

export default BlogDetail;

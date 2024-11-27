import React, { useState } from "react";
import '../UserLogin/userLogin.css'; // Reuse or update as needed
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../firebase'; // Adjust the import to match your Firebase config file

const UserSignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const storage = getStorage(app);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            setProfileImagePreview(URL.createObjectURL(file));
            setError(''); // Clear any previous errors
        }
    };

    const uploadImageToFirebase = (imageFile) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `profile_images/${imageFile.name}`);
            uploadBytes(storageRef, imageFile).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!profileImage) {
            setError('Profile image is required!');
            return;
        }
        setLoading(true);
        let imageURL = '';

        uploadImageToFirebase(profileImage).then((url) => {
            imageURL = url;
            axios.post('https://blogapi-7.onrender.com/auth/user/signup', {
                fullName,
                email,
                password,
                imageUrl: imageURL // Include image URL in the request
            })
            .then(res => {
                setLoading(false);
                console.log(res.data);
                localStorage.setItem('email', res.data.newUser.email);
                localStorage.setItem('fullName', res.data.newUser.fullName);
                localStorage.setItem('token', res.data.newUser.token); 
                localStorage.setItem('imageUrl',res.data.newUser.imageUrl);
                navigate('/home');
            })
            .catch(err => {
                setLoading(false);
                console.log('Error during signup:', err);
            });
        }).catch((error) => {
            setLoading(false);
            setError('Error uploading image. Please try again.');
            console.error('Error uploading image:', error);
        });
    }

    return (
        <div className="signUpContainer">
            <form onSubmit={submitHandler} className="signUpBox">
                <div className="imagePreviewContainer">
                    {profileImagePreview ? (
                        <img src={profileImagePreview} alt="Profile Preview" className="profileImagePreview" />
                    ) : (
                        <div className="imagePlaceholder">Upload Image</div>
                    )}
                </div>
                <h1 align="center">Sign Up</h1>
                <input
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                />
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
                <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                {error && <p className="errorMessage">{error}</p>}
                <button 
                    type="submit"
                    className="submitBtn"
                    disabled={isLoading || !profileImage} // Disable button if loading or no image
                >
                    {isLoading && <CircularProgress size={18} color="inherit" />}
                    <span style={{ marginLeft: '10px' }}>Submit</span>
                </button>
                <div className="signUpFooter">
                    <p>Already have an account? <a href="/login" className="signinLink">Sign In</a></p>
                </div>
            </form>
        </div>
    );
}

export default UserSignUp;

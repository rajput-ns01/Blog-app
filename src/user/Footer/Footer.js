import React from 'react'
import '../Footer/footer.css'
const Footer = ()=>{
    return(
        <div className='footer-container'>
            <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img className='footer-image' src={require('../../assets/linkedIn.png')}/>
            </div>
            <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <a className='social-link'>Facebook</a>
                <a className='social-link'>YouTube</a>
                <a className='social-link'>Twitter</a>
                <a className='social-link'>Instagram</a>
            </div>
        </div>
    )
}

export default Footer
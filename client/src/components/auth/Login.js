import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {password,email} = formData;

    const handleFormData=(e)=> setFormData({...formData,[e.target.name]:e.target.value});

    
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        console.log("---- Submit Login",formData)
    }

    return (
        <>
        <h1 className="large text-primary">Log In</h1>
        <form className="form" onSubmit={(e)=>{handleFormSubmit(e)}}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email}  onChange={(e)=>{handleFormData(e)}}/>
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password} 
              onChange={(e)=>{handleFormData(e)}}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Sign In" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/register">Sign Up</Link>
        </p>
        </>
    )
}

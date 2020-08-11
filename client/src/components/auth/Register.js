import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {connect} from  'react-redux';
import {setAlert} from '../../redux/actions/alertsActions';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/service/auth.service';

const Register = (props) => {
    const {setAlertAction,regUserAction} = props;
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const {name,password,password2,email} = formData;
    const handleFormData=(e)=> setFormData({...formData,[e.target.name]:e.target.value});
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(password === password2){
            console.log("Form : ",formData);
            regUserAction(formData);
            setFormData({
              name:'',
              email:'',
              password:'',
              password2:''
          })
        }
        else{
          let data ={msg:'Password mismatch',alertType:'danger'}
          setAlertAction(data);
        }
    }

    return (
        <>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={(e)=>{handleFormSubmit(e)}}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name}  onChange={(e)=>{handleFormData(e)}} />
          </div>
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
              value={password} 
              onChange={(e)=>{handleFormData(e)}}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2} 
              onChange={(e)=>{handleFormData(e)}}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </>
    )
}

const mapDispatchToProps=(dispatch)=>{
  return {
    setAlertAction : (data) => (dispatch(setAlert(data))),
    regUserAction : (data) => (dispatch(registerUser(data)))
  };
}

Register.propTypes ={
  setAlertAction : PropTypes.func.isRequired,
  regUserAction: PropTypes.func.isRequired,
}


export default connect(null,mapDispatchToProps)(Register);
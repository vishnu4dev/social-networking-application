import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/service/auth.service';
import { setAlert } from '../../redux/actions/alertsActions';

const Login = ({loginAction,isAuthenticated,setAlertAction}) => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const {password,email} = formData;

    const handleFormData=(e)=> setFormData({...formData,[e.target.name]:e.target.value});

    
    const handleFormSubmit=(e)=>{
        e.preventDefault();
       if(password.length  > 0 && email.length > 0 ){
          loginAction(formData);
          setFormData({
            email:'',
            password:'',
        })
       }
       else{ 
         setAlertAction({msg:'All Fields are mandat.*',alertType:'warning'});
        }
      }
      
    
    if(isAuthenticated){
      return <Redirect to='/dashboard' /> 
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


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.User.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginAction : (data) => dispatch(loginUser(data)),
    setAlertAction:(data) =>dispatch(setAlert(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
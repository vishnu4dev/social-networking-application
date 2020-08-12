import React,{useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {getCurrentProfile} from '../../redux/service/profile.services'

const Dashboard=(props)=>{
    const {getUserProfileAction} = props;

useEffect(() => {
    return () => {
        getUserProfileAction()
    }
}, [])

    return (
        <div>
            Dashboard
        </div>
    )
}


Dashboard.propTypes={
getUserProfileAction: PropTypes.func.isRequired,
userProfile: PropTypes.array.isRequired,
}

const mapDispatchToProps=(dispatch)=>({
  getUserProfileAction:()=>(dispatch(getCurrentProfile()))
});

const mapStateToProps=(state)=>({
  userProfile:state.Profile,
})


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

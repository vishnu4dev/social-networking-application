import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/service/profile.services";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";


const Dashboard = (props) => {
  const { getUserProfileAction, userProfile } = props;
  const { profile, loading } = userProfile;

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `dashboard`;
    getUserProfileAction();
  }, []);
  return ( 
       loading && profile === null ?
       <Spinner/> :
     <div>
        <h1 className="large text-primary"> Dashboard</h1>
        <p className="lead" >
            <i className="fa fa-user"></i>
            Welcome {profile && profile.user && profile.user.name}
        </p>
        {profile !== null ?
        <> View Profile </> :
        <>
        <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
        </Link>
        </> 
        }
     </div>)
};

Dashboard.propTypes = {
  getUserProfileAction: PropTypes.func.isRequired,
  userProfile: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getUserProfileAction: () => dispatch(getCurrentProfile()),
});

const mapStateToProps = (state) => ({
  userProfile: state.Profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

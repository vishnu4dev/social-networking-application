import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/authActions'

const Navbar = (props) => {
    const {isloading,isAuthenticated,logoutAction} = props;
    const guestView=()=>{
        return (
            <Fragment>
                <ul>
                <li><Link to="/home">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                </ul>
            </Fragment>
        )
    }

    const userView=()=>{
        return (
            <Fragment>
                <a><Link to="#" onClick={logoutAction}>
                <i class="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">
                        Logout
                    </span>
                </Link></a>
            </Fragment>
        )
    }

    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html"><i className="fas fa-sign-out-alt"></i> DevConnector</a>
            </h1>
            {!isloading && !isAuthenticated ?
                guestView() : userView()
            }
        </nav>
    )
}

 const mapStateToProps = (state) => {
    return {
       isAuthenticated: state.User.isAuthenticated,
       isloading: state.User.loading,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
     logoutAction:Link=> dispatch(logoutUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
import React from 'react'
import {connect} from  'react-redux';
import PropTypes from 'prop-types'

const AlertComponent =({alert}) => alert !== null &&
    Array.isArray(alert) && alert.length > 0 &&
    alert.map((_item)=>{
    return( <div key={_item.id} className={`alert alert-${_item.alertType}`}>
            {_item.msg}
        </div>)
    })


AlertComponent.propTypes = {
    alert: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        alert: state.Alerts
    }
}

export default connect(mapStateToProps, null)(AlertComponent) 


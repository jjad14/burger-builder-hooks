import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

import * as actions from '../../../store/actions/index';

const logout = props => {
    const { onLogout } = props;

    // run once on mount
    useEffect(() => {
        // call dispatcher
        onLogout();
    }, [onLogout]);

    return (<Redirect to="/"/>);
};

// Redux - dispatch action
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(logout);
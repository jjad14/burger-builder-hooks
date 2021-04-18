import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [sideDrawerVisibility, setSideDrawerVisibility] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!sideDrawerVisibility);
    };


    return (
        <Auxillary>
            <Toolbar
                isAuth={props.isAuthenticated} 
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}  
                open={sideDrawerVisibility} 
                closed={sideDrawerClosedHandler}/>

            <div className={classes.Wrapper}>
                <main className={classes.Content}>
                    { props.children }
                </main>
                <footer className={classes.Footer}>
                    <h4>Build a Burger Demo Project</h4>
                    <p>Where you make your own Burger!</p>
                </footer>
            </div>
        </Auxillary>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);
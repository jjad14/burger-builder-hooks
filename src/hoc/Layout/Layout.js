import React, { Component} from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Auxillary>
                <Toolbar
                    isAuth={this.props.isAuthenticated} 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}  
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <div className={classes.Wrapper}>
                    <main className={classes.Content}>
                        { this.props.children }
                    </main>
                    <footer className={classes.Footer}>
                        <h4>Build a Burger Demo Project</h4>
                        <p>Where you make your own Burger!</p>
                    </footer>
                </div>
            </Auxillary>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
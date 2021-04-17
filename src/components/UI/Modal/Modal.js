import React, { Component } from 'react';

import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // stop modal/ordersummary from re-rendering after ingredient button clicks
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || 
               nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Auxillary>
                <Backdrop 
                    show={this.props.show} 
                    clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>          
        );
    }
} 

export default Modal;
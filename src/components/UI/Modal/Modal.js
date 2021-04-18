import React from 'react';

import classes from './Modal.module.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

    return (
        <Auxillary>
            <Backdrop 
                show={props.show} 
                clicked={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxillary>          
    );
};

// React.memo allows us to optimize performance
// only update component when props of this component change
export default React.memo(
    modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
    );
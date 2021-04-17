import React from 'react';

import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ignKey => {
    return (
    <li key={ignKey}>
        <span style={{textTransform: 'capitalize'}}>{ignKey}:</span> 
        <p>x{props.ingredients[ignKey]}</p>
    </li>)
    });

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType="Danger" 
                clicked={props.purchasedCancelled}>CANCEL</Button>
            <Button 
                btnType="Success" 
                clicked={props.purchasedContinued}>CONTINUE</Button>
        </div>
    );
};



export default orderSummary;
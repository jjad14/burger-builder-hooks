import React from 'react';

import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {

    // transform ingredients object to array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <Ingredient key={ingKey + i} type={ingKey} />;
            });
        })
        // allows us to transform an array into something else
        // in this case we want to flatten the array
        .reduce((prevValue, currValue) => {
            return prevValue.concat(currValue)
        }, []); 

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
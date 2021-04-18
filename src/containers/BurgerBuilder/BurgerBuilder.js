import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


const burgerBuilder = props =>  {
    const [purchasing, setPurchasing] = useState(false);

    // Alternative to connect(mapStateToProps, mapDispatchToProps)
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    // run once on mount
    useEffect(() => {
        onInitIngredients();
    }, [ onInitIngredients ]);


    // disable order button by checking ingredient count
    const updatePurchaseState = (ingredients) => {
        // check if there is at least one ingredient on the burger for purchase
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        // purchasable is true if there is at least 1 ingredient
        return sum > 0;
    }

    // open modal via button click
    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    // close modal handler via backdrop click
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    let orderSummary = null;
    // loading on render by default until ingredients are loaded
    let burger = error 
    ? <p>Ingredients can't be loaded</p> 
    : <Spinner />;

    // only load if ingredients are loaded
    if (ings) {
        burger = (
            <Auxillary>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredients={ings} 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated}/>
            </Auxillary>);

        orderSummary = <OrderSummary 
                ingredients={ings}
                price={price}
                purchasedCancelled={purchaseCancelHandler}
                purchasedContinued={purchaseContinueHandler}/>;
    }

    return (
        <Auxillary>
            <Modal 
                show={purchasing} 
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxillary>
    );
};

export default (withErrorHandler(burgerBuilder, axios));
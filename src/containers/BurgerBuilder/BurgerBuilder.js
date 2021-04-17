import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    // disable order button by checking ingredient count
    updatePurchaseState(ingredients) {
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
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    // close modal handler via backdrop click
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        let orderSummary = null;
        // loading on render by default until ingredients are loaded
        let burger = this.props.error ? 
        <p>Ingredients can't be loaded</p> : <Spinner />;

        // only load if ingredients are loaded
        if (this.props.ings) {
            burger = (
                <Auxillary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredients={this.props.ings} 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}/>
                </Auxillary>);

            orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchasedCancelled={this.purchaseCancelHandler}
                    purchasedContinued={this.purchaseContinueHandler}/>;
        }

        return (
            <Auxillary>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: 
            (ingName) => dispatch(
                actions.addIngredient(ingName)),
        onIngredientRemoved: 
            (ingName) => dispatch(
                actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(
                actions.initIngredients()),
        onInitPurchase: () => dispatch(
                actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(
                actions.setAuthRedirectPath(path))
    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {

    const checkoutCancelledHandler = () => {
        // go back to the last page
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        // go to contact page without allowing user to go back
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;

    if (props.ings) {
        const purchasedRedirect = props.purchased 
        ? <Redirect to="/" /> 
        : null;

        summary = (
        <div>
            {purchasedRedirect}
            <CheckoutSummary 
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}/>
            <Route 
                path={props.match.path + '/contact-data'} 
                component={ContactData}/>
        </div>
        );
    }
    return summary;  
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(checkout);
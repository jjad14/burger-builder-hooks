import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const orders = (props) => {
    const { onFetchOrders } = props;

    // Fetch orders once, on component mount
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders]);

    // load spinner if loading (default)
    let orders = <Spinner />;

    // Map each order to Order Component
    if(!props.loading) {
        orders = props.orders.map(order => (
            <Order  
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
        ));
    }

    return (
        <div>
            {orders}
        </div>
    );

};

// Redux

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(
            actions.fetchOrders(token, userId))
    };
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(withErrorHandler(orders, axios));
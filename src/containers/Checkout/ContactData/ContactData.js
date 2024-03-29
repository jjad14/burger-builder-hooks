import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';
import { checkFormValidity } from '../../../shared/validation';

const contactData = props => {
    const [ orderForm, setOrderForm ] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
                validationText: 'A name is required'
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                validationText: 'An email is required'
            },
            valid: false,
            touched: false
        },
        phoneNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'tel',
                placeholder: 'Your Phone Number'
            },
            value: '',
            validation: {
                required: true,
                validationText: 'A phone number is required'
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Name'
            },
            value: '',
            validation: {
                required: true,
                validationText: 'A Street Address is required'
            },
            valid: false,
            touched: false
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6,
                validationText: 'A postal code with a min length of 6 is required'
            },
            valid: false,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your City'
            },
            value: '',
            validation: {
                required: true,
                validationText: 'A city is required'
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
                validationText: 'A Country is required'
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'Cheapest', displayValue: 'Cheapest'},
                    {value: 'Slow', displayValue: 'Slow'},
                    {value: 'fastest', displayValue: 'Fastest'}
                ]
            },
            value: 'Cheapest',
            validation: {},
            valid: true
        }
    });

    const [ formIsValid, setFormIsValid ] = useState(false);

    const orderHandler = (event) => {
        // prevent sending a request causing a  reload
        event.preventDefault();

        // transform state.orderForm so we only get name and the value
        const formData = {};
        for(let formEl in orderForm) {
            // key value pair {name: value }
            formData[formEl] = orderForm[formEl].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);
    };

    // two-way binding for forms user input
    const inputChangedHandler = (event, inputId) => {
        // get orderForm key (name, email etc) and update form element, validity and touched
        const updatedFormElement = updateObject(orderForm[inputId], {
            value: event.target.value,
            valid: checkFormValidity(event.target.value, orderForm[inputId].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        }); 

        let formIsValid = true;
        for(let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }

        // update state
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };


    const formElementsArray = [];
    
    // convert state.orderForm to jsx elements
    for(let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key] 
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formEl => (
                <Input
                    key={formEl.id} 
                    elementType={formEl.config.elementType}
                    elementConfig={formEl.config.elementConfig}
                    value={formEl.config.value}
                    invalid={!formEl.config.valid}
                    shouldValidate={formEl.config.validation}
                    touched={formEl.config.touched}
                    changed={(event) => inputChangedHandler(event, formEl.id)}/>
            ))}

            <Button 
                btnType="Success"
                disabled={!formIsValid}>Order</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(
            actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
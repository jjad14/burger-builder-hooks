import React, { useState, useEffect } from 'react';
import { connect } from'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';
import { checkFormValidity } from '../../shared/validation';

const auth = props => {
    const [ authForm, setAuthForm ] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                validationText: 'A Valid Email is Required'
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8,
                maxLength: 24,
                validationText: 'A Password is Required (min 8 characters)'
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    const{ buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    // run once on mount
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        // copy controls (not deep)
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkFormValidity(
                    event.target.value, 
                    authForm[controlName].validation),
                touched: true
            })
        });

        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        // prevent default form submission
        event.preventDefault();

        // call dispatcher
        props.onAuth(
            authForm.email.value,
            authForm.password.value,
            isSignup
        );
    };

    // switch authentication (login/signup)
    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];
    
    // convert orderForm elements to jsx elements
    for(let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key] 
        });
    }

    // map each orderForm state element to a jsx input element
    let form = formElementsArray.map(formEl => (
        <Input
            key={formEl.id} 
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={(event) => inputChangedHandler(event, formEl.id)}/>
    ));

    // loading is true -> spinner
    if(props.loading) {
        form = <Spinner />;
    }

    // error message if it exists
    let errorMessage = null;
    if (props.error) {
        errorMessage = <ErrorMessage error={props.error.message}/>
    }

    // redirect if user is authenticated
    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button  btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler} 
                btnType="Danger">
                SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
            </Button>
        </div>
    );
    
};


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(
            actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(
            actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
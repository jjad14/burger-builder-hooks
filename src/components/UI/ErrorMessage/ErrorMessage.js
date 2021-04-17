import React from 'react';
import classes from './ErrorMessage.module.css';

const errorMessage = (props) => {
    let errorMessage = null;

    // for demo purposes, error messages are specific, not recommended in production
    switch(props.error) {
        case 'EMAIL_NOT_FOUND':
            errorMessage = <p>Error: Email was not found.</p>;
            break;
        case 'INVALID_EMAIL':
            errorMessage = <p>Error: Invalid Email.</p>;
            break;
        case 'INVALID_PASSWORD':
            errorMessage = <p>Error: Invalid Password</p>;
            break;
        case 'USER_DISABLED':
            errorMessage = <p>Error: The user account has been disabled by an administrator</p>;
            break;
        case 'EMAIL_EXISTS':
            errorMessage = <p>Error: The email address is already in use by another account</p>;
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = <p>Error: Password sign-in is disabled for this project</p>;
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = <p>Error: We have blocked all requests from this device due to unusual activity. Try again later.</p>;
            break;
        default:
            errorMessage = <p>Error: An unknown error has occurred</p>
            break;
    }

    return (
        <div className={classes.ErrorMessage}>
            {errorMessage}
        </div>
    );
};

export default errorMessage;

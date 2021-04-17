import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
    let initalState = null;
    beforeEach(() => {
        initalState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
    });

    it('should return the inital state if we pass an invalid action type', () => {
        expect(reducer(undefined, {})).toEqual(initalState);
    });

    it('should store the token upon login success', () => {
        expect(reducer(initalState, {
            type: actionTypes.AUTH_SUCCESSS,
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

});


























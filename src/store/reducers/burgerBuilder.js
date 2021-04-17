import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

// define state
const initialState = {
    ingredients: null,
    totalPrice: 3.50,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 1.5,
    bacon: 1.0,
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            // order of ingredients in burger (visual)
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 3.50,
        error: false,
        building: false
    });
};

const fetchedIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
};

// create reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchedIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;
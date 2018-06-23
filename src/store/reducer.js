import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
}

const INGRIDIENT_PRICES = {
    salad: 20,
    bacon: 30,
    cheese: 15,
    meat: 50
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingredient]
            }
        case (actionTypes.REMOVE_INGREDIENT):
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredient]: state.ingredients[action.ingredient] - 1
            },
            totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingredient]
        }
        default:
            return state;
    }
}

export default reducer;
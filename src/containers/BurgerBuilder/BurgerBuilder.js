import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    modalClosed = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        let removeDisabledState = {...this.props.ings};
        for(let key in removeDisabledState) {
            removeDisabledState[key] = removeDisabledState[key] <= 0;
        }

        let addDisabledState = {...this.props.ings};
        for(let key in addDisabledState) {
            addDisabledState[key] = addDisabledState[key] >= 2;
        }

        let isOrderDisabled = true;
        if(this.props.price>0)
            isOrderDisabled = false;
        
        let burger = <div>Loading...</div>;
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
                        <OrderSummary ingredients={this.props.ings} cancelPurchase={this.modalClosed} price={this.state.totalPrice} continuePurchase={this.purchaseContinueHandler}/>
                    </Modal>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        price={this.props.price} 
                        addClicked={this.props.onIngredientAdded} 
                        removeClicked={this.props.onIngredientRemoved} 
                        addDisabledState={addDisabledState} 
                        removeDisabledState={removeDisabledState} 
                        isOrderDisabled={isOrderDisabled} 
                        ordered={this.purchaseHandler} 
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                {burger}
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredientName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
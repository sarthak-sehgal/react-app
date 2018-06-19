import React, {Component} from 'react';
import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

const INGRIDIENT_PRICES = {
    salad: 20,
    bacon: 30,
    cheese: 15,
    meat: 50
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        addDisabledState: {
            salad: false,
            bacon: false,
            cheese: false,
            meat: false
        },
        removeDisabledState: {
            salad: true,
            bacon: true,
            cheese: true,
            meat: true
        },
        totalPrice: 0,
        purchasing: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        if(oldCount<2 && !this.state.purchasing) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceAdded = INGRIDIENT_PRICES[type];
            const updatedPrice = this.state.totalPrice + priceAdded;
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        }
        else {
            alert('You can not add any more ' + type + 's!');
        }
        if(updatedCount===2) {
            let addDisabledState = this.state.addDisabledState;
            addDisabledState[type] = true;
            this.setState({addDisabledState: addDisabledState});
        }
        if(updatedCount>0) {
            let removeDisabledState = this.state.removeDisabledState;
            removeDisabledState[type] = false;
            this.setState({removeDisabledState: removeDisabledState});
        }
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        if(oldCount>0 && !this.state.purchasing) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGRIDIENT_PRICES[type];
            const updatedPrice = this.state.totalPrice - priceDeduction;
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        }
        else {
            alert('Please add at least one ' + type + '!');
        }
        if(updatedCount<2) {
            let addDisabledState = this.state.addDisabledState;
            addDisabledState[type] = false;
            this.setState({addDisabledState: addDisabledState});
        }
        if(updatedCount===0) {
            let removeDisabledState = this.state.removeDisabledState;
            removeDisabledState[type] = true;
            this.setState({removeDisabledState: removeDisabledState});
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    modalClosed = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Test',
        //         address: {
        //             street: 'TestStreet',
        //             zipCode: 'TestZip',
        //             country: 'TestCountry'
        //         },
        //         email: 'test@test.com'
        //     },
        //     delivery: 'Quick'
        // }
        // axios.post('/orders.json', order)
        // .then(response => {
        //     let ingredients = this.state.ingredients;
        //     Object.keys(ingredients).map(key => ingredients[key] = 0);
        //     this.setState({ingredients: ingredients, totalPrice: 0, purchasing: false});
        //     alert("Order complete!");
        // })
        // .catch(error => {
        //     alert("Oops!" + error);
        //     this.setState({purchasing: false});
        // });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        let isOrderDisabled = true;
        if(this.state.totalPrice>0)
            isOrderDisabled = false;
        
        let burger = <div>Loading...</div>;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Modal show={ this.state.purchasing} modalClosed={this.modalClosed}>
                    <OrderSummary ingredients={this.state.ingredients} cancelPurchase={this.modalClosed} price={this.state.totalPrice} continuePurchase={this.purchaseContinueHandler}/>
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls price={this.state.totalPrice} addClicked={this.addIngredientHandler} removeClicked={this.removeIngredientHandler} addDisabledState={this.state.addDisabledState} removeDisabledState={this.state.removeDisabledState} isOrderDisabled={isOrderDisabled} ordered={this.purchaseHandler} />
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

export default BurgerBuilder;
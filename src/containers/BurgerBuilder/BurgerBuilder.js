import React, {Component} from 'react';
import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRIDIENT_PRICES = {
    salad: 20,
    bacon: 30,
    cheese: 15,
    meat: 50
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
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
        totalPrice: 0
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        if(oldCount<2) {
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
        if(oldCount>0) {
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

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} addClicked={this.addIngredientHandler} removeClicked={this.removeIngredientHandler} addDisabledState={this.state.addDisabledState} removeDisabledState={this.state.removeDisabledState} />
            </Aux>
        )
    }
};

export default BurgerBuilder;
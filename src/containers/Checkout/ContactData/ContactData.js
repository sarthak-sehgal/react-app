import React, { Component } from 'react';
import axios from '../../../axios-orders';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import {ORDER_COMPLETE} from '../../../store/actions';

class ContactData extends Component {
    setOrderForm (elementType, type, placeholder, value) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: true
            },
            valid: false
        };
    }
    state = {
        orderForm: {
            name: this.setOrderForm('input', 'text', 'Name', ''),
            email: this.setOrderForm('input', 'email', 'Email', ''),
            street: this.setOrderForm('input', 'text', 'Street', ''),
            zipCode: this.setOrderForm('input', 'text', 'Zip Code', ''),
            country: this.setOrderForm('input', 'text', 'Country', ''),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'normal', displayValue: 'Normal'}, {value: 'fast', displayValue: 'Fast'}]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        if(!this.state.formIsValid) {
            alert('Form field(s) empty!');
        } else {
            this.setState( { loading: true } );

            // get form data to submit like {name: testName, email: te@st.com}
            const formData = {};
            for(let formDataElement in this.state.orderForm) {
                formData[formDataElement] = this.state.orderForm[formDataElement].value;
            }

            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }
            axios.post( '/orders.json', order )
                .then( response => {
                    this.setState( { loading: false } );
                    this.props.onOrderComplete();
                    this.props.history.push('/');
                } )
                .catch( error => {
                    this.setState( { loading: false } );
                } );
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // for deep cloning as spread operator doesn't clone nested objects but returns a pointer to it
        // this is done so that the state is not mutated, immutable!
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement['value'] = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        // Validation for each input
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        // Validation for the whole form
        let isFormValid = true;
        for (let input in updatedOrderForm)
        {
            isFormValid = isFormValid && updatedOrderForm[input]['valid'];
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: isFormValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    render () {
        let inputs = [];
        for(let field in this.state.orderForm) {
            inputs.push({
                id: field,
                config: this.state.orderForm[field]
            });
        }
        let inputElements = inputs.map(input => 
            <Input 
                elementType={input['config']['elementType']} 
                elementConfig={input['config']['elementConfig']} 
                value={input['config']['value']} 
                key={input['id']} 
                changed={(event) => this.inputChangedHandler(event, input['id'])} 
            />
        );
        let form = (
            <form onSubmit={this.orderHandler}>
                {inputElements}
                {/* no need for clicked as we are using onSubmit*/}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <div>Ordering...</div>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderComplete: () => dispatch({type: ORDER_COMPLETE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
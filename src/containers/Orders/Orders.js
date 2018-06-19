import React, {Component} from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(response => {
            let orders = [];
            for(let order in response.data)
            {
                orders.push({
                    ...response.data[order],
                    id: order
                });
            }
            this.setState({orders: orders, loading: false});
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
        });
    }
    render () {
        let orders = null;
        if(this.state.loading)
        {
            orders = "Loading...";
        } else {
            orders = this.state.orders
            .map(order => 
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />);
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;
import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(key => {
			return [...Array(props.ingredients[key])].map((_, i) => 
				{ return <BurgerIngredient key={key+i} type={key} />; }
			);
		})
		.reduce((arr,el) => arr.concat(el), []);
	if(transformedIngredients.length === 0)
		transformedIngredients = <p>Please star adding ingredients!</p>;
	return (
		<div className={classes.burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
};

export default burger;
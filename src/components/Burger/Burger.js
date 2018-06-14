import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients)
		.map(key => {
			return [...Array(props.ingredients[key])].map((_, i) => 
				{ return <BurgerIngredient key={key+i} type={key} />; }
			);
		});
	return (
		<div className={classes.burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
};

export default burger;
import React, { memo } from 'react';
import propTypes from 'prop-types';
import Item from '../item';
import './styles.css';

function List({ items, actions }) {
	return (
		<div className="List">
			{items.map(item => (
				<div className="List__item" key={item.code}>
					<Item
						item={item}
						actions={
							actions &&
							// если в будущем экшнов надо будет больше, достаточно будет закинуть их в пропс
							actions.map((action, i) => (
								<button key={i} onClick={() => action.callback(item.code)}>
									{action.name}
								</button>
							))
						}
					/>
				</div>
			))}
		</div>
	);
}

List.propTypes = {
	items: propTypes.arrayOf(propTypes.object).isRequired,
	actions: propTypes.arrayOf(propTypes.object),
};

List.defaultProps = {
	items: [],
	actions: [],
};

export default memo(List);

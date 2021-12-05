import React, { memo } from 'react';
import propTypes from 'prop-types';
import './styles.css';

function Item({ item, actions }) {
  return (
    <div className="Item">
      <div className="Item__number">{item.order ? item.order : item.code}</div>
      <div className="Item__title">{item.title}</div>
      <div className="Item__price">{item.price} &#8381;</div>
      {item.count && <div className="Item__count">{item.count} шт</div>}
      {actions.length > 0 && <div className="Item__actions">{actions}</div>}
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
};

export default memo(Item);

import React, { memo } from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './styles.css';

function Controls({ totalCount, totalPrice, onOpenModal }) {
  return (
    <div className="Controls">
      <div className="Controls__title">В корзине: </div>
      <div className="Controls__subtitle">
        {plural(totalCount, '%d товар', '%d товара', '%d товаров')} /{' '}
        {totalPrice} &#8381;
      </div>
      <button onClick={onOpenModal}> Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenModal: propTypes.func.isRequired,
  totalCount: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {
  onOpenModal: () => {},
};

export default memo(Controls);

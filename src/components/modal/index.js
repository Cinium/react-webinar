import React, { memo } from 'react';
import './styles.css';
import List from '../list';

function Modal({ items, totalCount, totalPrice, title, isOpen, onCloseModal }) {
	return (
		<div className={`Modal ${isOpen && 'Modal_opened'}`}>
			<div className="Modal__container">
				<div className="Modal__head">
					<div className="Modal__title">{title}</div>
					<button className="Modal__close-button" onClick={onCloseModal}>
						Закрыть
					</button>
				</div>
				<div className="Modal__items">
					<List items={items} />
				</div>
				<div className="Modal__total">
					Итого
					<div className="Modal__total-price">{totalPrice} &#8381;</div>
					<div className="Modal__total-count">{totalCount} шт</div>
				</div>
			</div>

			<div className="Modal__overlay" onClick={onCloseModal}></div>
		</div>
	);
}

export default memo(Modal);

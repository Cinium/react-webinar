import React, { useCallback, useEffect, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
	const callbacks = {
		onOpenModal: useCallback(() => store.setModalIsOpen(true), [store]),
		onCloseModal: useCallback(() => store.setModalIsOpen(false), [store]),
		onAddToBasket: useCallback(code => store.addToBasket(code), [store]),
	};
	const actions = [{ name: 'Добавить', callback: callbacks.onAddToBasket }];

	const [totalPrice, setTotalPrice] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		let price = 0;
		let count = 0;
		
		store.getState().basket.forEach(item => {
			price += item.price.split(' ').join('') * item.count;
			count += item.count;
		});
		
		setTotalPrice(price);
		setTotalCount(count);
	}, [store.getState().basket, store.addToBasket]);

	return (
		<>
			<Layout head={<h1>Магазин</h1>}>
				<Controls
					totalPrice={totalPrice}
					totalCount={totalCount}
					onOpenModal={callbacks.onOpenModal}
				/>
				<List
					items={store.getState().items}
					onAddToBasket={store.addToBasket}
					actions={actions}
				/>
			</Layout>
			<Modal
				items={store.getState().basket}
				totalPrice={totalPrice}
				totalCount={totalCount}
				title={'Корзина'}
				isOpen={store.getState().isModalOpen}
				onCloseModal={callbacks.onCloseModal}
			/>
		</>
	);
}

export default App;

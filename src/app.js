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

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          totalPrice={store.getState().basket.totalPrice}
          totalCount={store.getState().basket.totalCount}
          onOpenModal={callbacks.onOpenModal}
        />
        <List
          items={store.getState().items}
          onAddToBasket={store.addToBasket}
          actions={actions}
        />
      </Layout>
      <Modal
        items={store.getState().basket.items}
        totalPrice={store.getState().basket.totalPrice}
        totalCount={store.getState().basket.totalCount}
        title={'Корзина'}
        isOpen={store.getState().isModalOpen}
        onCloseModal={callbacks.onCloseModal}
      />
    </>
  );
}

export default App;

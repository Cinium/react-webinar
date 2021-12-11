import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pages from "../../components/pages/pages";

function Main() {
  const select = useSelector((state) => ({
    items: state.catalog.items,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load();
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
    load: useCallback((offset, page) => store.catalog.load(offset, page)),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pages load={callbacks.load} page={select.page} />
    </Layout>
  );
}

export default React.memo(Main);

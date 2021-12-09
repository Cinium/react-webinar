import React, { useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pages from "../../components/pages/pages";
import { Route, Routes } from "react-router";
import ItemPage from "../../components/item-page/item-page";

function Main() {
  const [head, setHead] = useState("");

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    head: state.catalog.head,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load();
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
    load: useCallback((offset) => store.catalog.load(offset)),
    getItemInfo: useCallback((id) => store.catalog.getItemInfo(id)),
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
    <Layout head={<h1>{head || "Магазин"}</h1>}>
      <BasketSimple
        setHead={setHead}
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <List items={select.items} renderItem={renders.item} />
              <Pages load={callbacks.load} />
            </>
          }
        />

        <Route
          path="/items/:item_id"
          element={
            <ItemPage
              setHead={setHead}
              getInfo={callbacks.getItemInfo}
              onAdd={callbacks.addToBasket}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

export default React.memo(Main);

import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ItemDescription from "../../components/item-description/item-description";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function ItemPage() {
  const { item_id } = useParams();
  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
    getInfo: useCallback((id) => store.catalog.getItemInfo(id)),
  };

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.selectedItem
  }));

  useEffect(async () => await callbacks.getInfo(item_id), []);

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemDescription item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default memo(ItemPage);

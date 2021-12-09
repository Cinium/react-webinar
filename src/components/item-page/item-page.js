import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./item-page.css";

function ItemPage({ getInfo, onAdd, setHead }) {
  const { item_id } = useParams();
  const [item, setItem] = useState({});

  useEffect(async () => {
    const info = await getInfo(item_id);

    setItem(info);
    setHead(info.title)
  }, []);

  return (
    <div className="ItemPage">
      <p className="ItemPage__description">{item.description}</p>
      {item.maidIn && (
        <div className="ItemPage__detail">
          Страна производитель: <span className="ItemPage__detail-span">{item.maidIn.title} ({item.maidIn.code})</span>
        </div>
      )}
      {item.category && (
        <div className="ItemPage__detail">
          Категория: <span className="ItemPage__detail-span">{item.category.title}</span>
        </div>
      )}

      <div className="ItemPage__detail">
        Год выпуска: <span className="ItemPage__detail-span">{item.edition}</span>
      </div>
      <div className="ItemPage__price ItemPage__detail">
        Цена: <span className="ItemPage__detail-span">{item.price}</span>
      </div>

      <button onClick={() => onAdd(item._id)} >Добавить</button>
    </div>
  );
}

export default memo(ItemPage);

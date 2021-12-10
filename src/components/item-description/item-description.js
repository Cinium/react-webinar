import React from 'react';
import './item-description.css';

function ItemDescription({ onAdd, item }) {
  return (
    <div className="ItemDescription">
      <p className="ItemDescription__description">{item.description}</p>
      {item.maidIn && (
        <div className="ItemDescription__detail">
          Страна производитель:{" "}
          <span className="ItemDescription__detail-span">
            {item.maidIn.title} ({item.maidIn.code})
          </span>
        </div>
      )}
      {item.category && (
        <div className="ItemDescription__detail">
          Категория: <span className="ItemDescription__detail-span">{item.category.title}</span>
        </div>
      )}

      <div className="ItemDescription__detail">
        Год выпуска: <span className="ItemDescription__detail-span">{item.edition}</span>
      </div>
      <div className="ItemDescription__price ItemDescription__detail">
        Цена: <span className="ItemDescription__detail-span">{item.price}</span>
      </div>

      <button onClick={() => onAdd(item._id)}>Добавить</button>
    </div>
  );
}

export default ItemDescription;

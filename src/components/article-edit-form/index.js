import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";
import numberFormat from "../../utils/number-format";
import Select from "../select";

function ArticleEditForm({ article, onSave, countries, categories, error }) {
  // CSS классы по БЭМ
  const className = cn("ArticleEditForm");
  const [inputData, setInputData] = useState(article);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(inputData);
  }

  // const handleChange = ({ name, value }) => {
  //   if (typeof e === "object") return setInputData({ ...inputData, [name]: value });

  //   const maidIn = countries.find((country) => country.title === e);
  //   if (maidIn) return setInputData({ ...inputData, maidIn });

  //   const category = categories.find((category) => category.title === e);
  //   setInputData({ ...inputData, category });
  // };

  const handleChange = ({ name, value }) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <form className={className()} onSubmit={handleSubmit}>
      <div className={className("Prop")}>
        <label htmlFor="title" className={className("Label")}>
          Название
        </label>
        <input
          id="title"
          defaultValue={article.title}
          placeholder="Название"
          className={className("Value")}
          onChange={(e) => handleChange({ name: "title", value: e.target.value })}
        />
      </div>

      <div className={className("Prop", [className("Description")])}>
        <label htmlFor="description" className={className("Label")}>
          Описание
        </label>
        <textarea
          id="description"
          defaultValue={article.description}
          placeholder="Описание"
          className={className("Value", [className("Description-input")])}
          onChange={(e) => handleChange({ name: "description", value: e.target.value })}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="maidIn" className={className("Label")}>
          Страна производитель:
        </label>
        <Select
          onChange={(e) => handleChange({ name: "maidIn", value: { _id: e } })}
          value={inputData.maidIn?.title}
          options={countries || []}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="category" className={className("Label")}>
          Категория:
        </label>
        <Select
          onChange={(e) => handleChange({ name: "category", value: { _id: e } })}
          value={inputData.category?.title}
          options={categories || []}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="edition" className={className("Label")}>
          Год выпуска:
        </label>
        <input
          id="edition"
          defaultValue={article.edition}
          placeholder="Год выпуска"
          className={className("Value")}
          onChange={(e) => handleChange({ name: "edition", value: e.target.value })}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="price" className={className("Label")}>
          Цена (₽)
        </label>
        <input
          id="price"
          defaultValue={numberFormat(article.price)}
          placeholder="Цена"
          className={className("Value")}
          onChange={(e) => handleChange({ name: "price", value: e.target.value })}
        />
      </div>
      <span className={className("Error")} style={{ display: error ? "block" : "none" }}>
        Что-то пошло не так...
      </span>
      <button type="submit">Сохранить</button>
    </form>
  );
}

ArticleEditForm.propTypes = {
  article: propTypes.object.isRequired,
  onSave: propTypes.func,
};

ArticleEditForm.defaultProps = {
  article: {},
  onSave: () => {},
};

export default React.memo(ArticleEditForm);

import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";
import numberFormat from "../../utils/number-format";
import Select from "../select";
import Input from "../input";
import Textarea from "../textarea";

function ArticleEditForm({ article, onSave, countries, categories, error, change, form }) {
  // CSS классы по БЭМ
  const className = cn("ArticleEditForm");

  function handleSubmit(e) {
    e.preventDefault();
    onSave(article._id);
  }

  const onChangeHandler = useCallback(
    (name) => {
      return (e) => change(name, e);
    },
    [change]
  );

  return (
    <form className={className()} onSubmit={handleSubmit}>
      <div className={className("Prop")}>
        <label htmlFor="title" className={className("Label")}>
          Название
        </label>
        <Input
          value={article.title}
          placeholder="Название"
          className={className("Value")}
          onChange={onChangeHandler("title")}
        />
      </div>

      <div className={className("Prop", [className("Description")])}>
        <label htmlFor="description" className={className("Label")}>
          Описание
        </label>
        <Textarea
          value={article.description}
          placeholder="Описание"
          className={className("Value", [className("Description-input")])}
          onChange={onChangeHandler("description")}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="maidIn" className={className("Label")}>
          Страна производитель:
        </label>
        <Select
          onChange={onChangeHandler("maidIn")}
          value={form.maidIn?.title}
          options={countries || []}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="category" className={className("Label")}>
          Категория:
        </label>
        <Select
          onChange={onChangeHandler("category")}
          value={form.category?.title}
          options={categories || []}
        />
      </div>

      <div className={className("Prop")}>
        <label htmlFor="edition" className={className("Label")}>
          Год выпуска:
        </label>
        <Input
          value={numberFormat(article.edition)}
          placeholder="Год выпуска"
          className={className("Value")}
          onChange={onChangeHandler("edition")}
        />
        <span className={className("Error")} style={{ display: error?.edition ? "block" : "none" }}>
          {error?.edition}
        </span>
      </div>

      <div className={className("Prop")}>
        <label htmlFor="price" className={className("Label")}>
          Цена (₽)
        </label>
        <Input
          value={numberFormat(article.price)}
          placeholder="Цена"
          className={className("Value")}
          onChange={onChangeHandler("price")}
        />
        <span className={className("Error")} style={{ display: error?.price ? "block" : "none" }}>
          {error?.price}
        </span>
      </div>
      <span className={className("Error")} style={{ display: error?.isVisible ? "block" : "none" }}>
        {error?.message}
      </span>
      <button type="submit" disabled={Object.keys(error).length > 0}>
        Сохранить
      </button>
    </form>
  );
}

ArticleEditForm.propTypes = {
  article: propTypes.object.isRequired,
  onSave: propTypes.func,
  countries: propTypes.array,
  categories: propTypes.array,
  change: propTypes.func,
  form: propTypes.object,
  error: propTypes.object,
};

ArticleEditForm.defaultProps = {
  article: {},
  onSave: () => {},
  countries: [],
  categories: [],
  form: {},
  error: {},
};

export default React.memo(ArticleEditForm);

import React, { useCallback, useMemo } from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.categories,
  }));

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        { value: "key", title: "По коду" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    categories: [
      { value: "all", title: "Все" },
      ...select.categories.map(c => ({
        ...c,
        value: c._id,
        title: "- ".repeat(c.nesting) + c.title,
      })),
    ],
  };

  const callbacks = {
    onSort: useCallback((sort) => store.catalog.setParams({ sort }), [store]),
    onCategorize: useCallback((category) => store.catalog.setParams({ category, page: 1 }), [store]),
    onSearch: useCallback((query) => store.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
  };

  return (
    <LayoutTools>
      <Select onChange={callbacks.onCategorize} value={select.category} options={options.categories} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={"Поиск"} theme="big" />
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);

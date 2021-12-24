import React, { useCallback } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleEditForm from "../../components/article-edit-form";

function ArticleEdit() {
  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.get("article").load(params.id);
    await store.get("article").getCountries();
    await store.get("catalog").getCategories();
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    countries: state.article.countries,
    categories: state.catalog.categories,
    error: state.article.error
  }));

  const callbacks = {
    updateArticle: useCallback((data) => store.get("article").update(data), [store]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />

      <Spinner active={select.waiting}>
        <ArticleEditForm
          article={select.article}
          onSave={callbacks.updateArticle}
          categories={select.categories}
          countries={select.countries}
          error={select.error}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);

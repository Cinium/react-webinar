import StoreModule from "../module";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      waiting: true,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    this.updateState({
      waiting: true,
      data: {},
      error: false,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false,
      });
    }
  }

  async update(data) {
    this.updateState({ waiting: true });
    try {
      const res = await fetch(`/api/v1/articles/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          price:
            typeof data.price === "string"
              ? parseInt(data.price.replace(/\s/g, ""), 10)
              : data.price,
          edition:
            typeof data.edition === "string"
              ? parseInt(data.edition.replace(/\s/g, ""), 10)
              : data.edition,
        }),
      });
      const json = await res.json();

      this.updateState({ data: json.result });
    } catch (e) {
      console.log(e);
      this.updateState({ error: true });
      setTimeout(() => {
        this.updateState({ error: false });
      }, 5000);
    } finally {
      this.updateState({ waiting: false });
    }
  }
}

export default ArticleStore;

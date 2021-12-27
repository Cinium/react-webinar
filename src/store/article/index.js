import StoreModule from "../module";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      editForm: {},
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
      editForm: {},
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

  async update(_id) {
    this.updateState({ waiting: true });
    const body = JSON.stringify(this.getState().editForm)

    try {
      const res = await fetch(`/api/v1/articles/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const json = await res.json();

      this.updateState({ data: json.result });
    } catch (e) {
      this.updateState({ error: true });

      setTimeout(() => {
        this.updateState({ error: false });
      }, 5000);
    } finally {
      this.updateState({ waiting: false });
    }
  }

  setEditFormData({ name, value }) {
    if (name === "edition" || name === "price") value = value.replace(/\s/g, "");
    if (name === "price") value = parseFloat(value.replace(",", "."));
    if (name === "edition") value = parseInt(value, 10);

    this.updateState({
      editForm: {
        ...this.getState().editForm,
        [name]: value,
      },
    });
  }
}

export default ArticleStore;

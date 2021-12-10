import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      selectedItem: {},
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(offset = 0) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${offset}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
    });
  }

  async getItemInfo(id) {
    try {
      const res = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await res.json();

      this.setState({
        ...this.getState(),
        selectedItem: json.result
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export default CatalogStore;

import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      page: 1,
      limit: 10
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(offset = 0, page = 1, limit = 10) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${offset}`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      page
    });
  }
}

export default CatalogStore;

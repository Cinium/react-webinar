import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(offset = 0) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${offset}`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
    });
  }
}

export default CatalogStore;

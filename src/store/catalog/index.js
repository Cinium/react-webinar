import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      head: ''
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

  async getItemInfo(id) {
    try {
      const res = await fetch(`/api/v1/articles/${id}`);
      const json = await res.json();
      
      return json.result;
    } catch (e) {
      console.log(e);
    }
  }
}

export default CatalogStore;

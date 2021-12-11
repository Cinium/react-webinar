import StoreModule from "../module";

class ItemPageStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      selectedItem: {},
    };
  }

  async getItemInfo(id) {
    try {
      const res = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await res.json();

      this.setState({
        selectedItem: json.result
      })
    } catch (e) {
      console.log(e);
    }
  }
}

export default ItemPageStore;

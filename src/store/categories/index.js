import StoreModule from "../module";

class CategoriesStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      categories: [],
    };
  }

  async load() {
    this.updateState({ waiting: true });

    const res = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title,name`);
    const json = await res.json();
    const items = json.result.items;

    const getNestLevel = (item, nest = 0) => {
      const parent = items.find((i) => i._id === item.parent._id);
      if (parent.parent) {
        nest += 1;
        getNestLevel(parent, nest);
      }
      return nest + 1;
    };

    const categories = items.map((item) => ({
      ...item,
      nesting: item.parent ? getNestLevel(item) : 0,
    }));

    const sortedCategories = categories.reduce((prev, curr) => {
      let parent = prev.find((i) => curr.parent && i._id === curr.parent._id);
      let index = prev.indexOf(parent);
      index = index !== -1 ? index + 1 : prev.length;
      prev.splice(index, 0, curr);
      return prev;
    }, []);

    this.updateState({
      categories: sortedCategories,
      waiting: false,
    });
  }
}

export default CategoriesStore;

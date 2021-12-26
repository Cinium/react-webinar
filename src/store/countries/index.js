import StoreModule from "../module";

class CountriesStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      countries: [],
    };
  }

  async load() {
    this.updateState({ waiting: true });

    try {
      const res = await fetch(`/api/v1/countries?limit=*&fields=_id,title`);
      const json = await res.json();
      this.updateState({ countries: json.result.items });
    } catch (e) {
      console.log(e);
      this.updateState({ error: true });
    } finally {
      this.updateState({ waiting: false });
    }
  }
}

export default CountriesStore;

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listeners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listner of this.listeners) {
      listner(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map(item => item.code)) + 1;
    this.setState({
      items: this.state.items.concat({
        code,
        title: 'Новая запись №'+code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      items: this.state.items.map(item => {
        if (item.code === code){
          item.selected = !item.selected;
          // при клике добавляем к счетчику 1
          // если значение falsy, значит счетчик еще пуст и просто ставим 1
          item.clicks = item.clicks + 1 || 1;
        }
        return item;
      })
    });
  }

  checkDeclension({ clicks }) {
		const lastDigit = clicks % 10;

		if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
			return clicks > 11 && clicks < 15
        ? `${clicks} раз`
        : `${clicks} раза`;
		}
		return `${clicks} раз`;
	}
}

export default Store;
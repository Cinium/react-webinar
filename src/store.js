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
		};
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
		for (const listener of this.listeners) {
			listener(this.state);
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
				title: 'Новая запись №' + code,
			}),
		});
	}

	/**
	 * Удаление записи по её коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			items: this.state.items.filter(item => item.code !== code),
		});
	}

	/**
	 * Выделение записи по её коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			items: this.state.items.map(item => {
				if (item.code === code) {
					return {
						...item,
						selected: !item.selected,
					};
				}
				return item;
			}),
		});
	}

	setModalIsOpen(boolean) {
		this.setState({
			...this.state,
			isModalOpen: boolean,
		});
	}

	addToBasket(code) {
		const index = this.state.basket.findIndex(item => item.code === code);

		this.setState({
			...this.state,
			basket:
      // если индекс больше -1, значит товар уже есть в корзине
				index > -1
        // перебираем корзину, добавляя количество
					? this.state.basket.map(item => {
							if (item.code === this.state.basket[index].code) {
								item.count++;
							}
							return item;
					  })
            // иначе добавляем новый товар
					: [
							...this.state.basket,
							{
								...this.state.items.find(item => item.code === code),
								count: 1,
								order: this.state.basket.length + 1,
							},
					  ],
		});
	}
}

export default Store;

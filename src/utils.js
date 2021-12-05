import React from 'react';

/**
 * Провайдер изменений в store
 * Компонент React, реагирует на изменения store для обновления внутреннего состояния и тем самым
 * заставляя React перерендерить его и вложенные компоненты.
 */
export function Provider({ store, children }) {
  // Применим внутреннее состояние компонента.
  // Изменяя состояние заставим React перерендерить компонент.
  const [state, setState] = React.useState();
  //
  // // Подписка на изменение store
  React.useEffect(() => {
    return store.subscribe(newState => setState(newState));
  }, []);

  // Рендер вложенных компонентов с передачей им store
  return React.Children.map(children, child =>
    React.cloneElement(child, { store })
  );
}

/**
 * Вариант провайдера с использованием класса
 */
export class ProviderClass extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(state =>
      this.setState(state)
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    // Рендерим всех подчиенных, который переданы в Provider с передачей им свойств
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        store: this.props.store,
      })
    );
  }
}

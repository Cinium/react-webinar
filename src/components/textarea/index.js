import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import throttle from "lodash.throttle";

function Textarea(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    props.onChange(event.target.value);
  }, [change, props.onChange]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
  }, [props.value]);

  // CSS классы по БЭМ
  const className = cn('Textarea');

  return (
    <textarea
      className={className({theme: props.theme})}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

Textarea.propTypes = {
  value: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

Textarea.defaultProps = {
  onChange: () => {},
  theme: ''
}

export default React.memo(Textarea);

import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';

function Select({ onChange, value, options }){

  // CSS классы по БЭМ
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange])

  return (
    <select className={className()} onChange={onSelect} value={value}>
      {options.map(item => (
        <option key={item.value || item._id} value={item.value}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

Select.defaultProps = {
  onChange: () => {
  }
}

export default React.memo(Select);

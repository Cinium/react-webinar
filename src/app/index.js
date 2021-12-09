import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter } from 'react-router-dom';

/**
 * Приложение
 */
function App() {

  const select = useSelector(state => ({
    name: state.modals.name
  }));

  return (
    <BrowserRouter>
      <Main/>
      {select.name === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);

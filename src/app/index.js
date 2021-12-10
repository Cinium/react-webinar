import React from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemPage from "./item-page/item-page";

/**
 * Приложение
 */
function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/items/:item_id"
          element={<ItemPage  />}
        />
        <Route path="/" element={<Main />} />
      </Routes>

      {select.name === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default React.memo(App);

/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from "react";
import { mainContext } from "./context/main";
import Routing from "./Routes";
import product from "./Data/products.json";

function App(): JSX.Element {
  const AppContext = mainContext;
  const [loggedUserData, setLoggedUserData] = useState<any>(null);
  const [basketCount, setBasketCount] = useState<number>(0);
  const [addedFoods, setAddedFoods] = useState([]);
  const [productsList, setProductsList] = useState(product);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          loggedUserData,
          setLoggedUserData,
          basketCount,
          setBasketCount,
          addedFoods,
          setAddedFoods,
          setProductsList,
          productsList,
        }}
      >
        <Routing />
      </AppContext.Provider>
    </div>
  );
}

export default App;

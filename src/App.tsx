import { Contador } from "./components/contador/Contador";
import { ContadorMejorado } from "./components/contador/ContadorMejorado";
import { CrudAPI } from "./components/crud/CrudAPI";
import { ShoppingCard } from "./components/shoppingCart/ShoppingCart";

function App() {
  return (
    <>
      <div>
        <h1>useReducer</h1>
        <hr />
        <Contador />
        <hr />
        <ContadorMejorado />
        <hr />
        <ShoppingCard />
        <hr />
        <CrudAPI />
      </div>
    </>
  );
}

export default App;

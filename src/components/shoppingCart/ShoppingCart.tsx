import { useReducer } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../../reducers/shoppingReducer";
import { ProductItem } from "./ProductItem";
import { CartItem } from "./CartItem";
import { TYPES } from "../../actions/shoppingActions";

export const ShoppingCard = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart, products } = state;

  const addToCart = (id: number) =>
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });

  const delOneFromCart = (id: number) =>
    dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
  const delAllFromCart = (id: number) =>
    dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
  const cleanCart = () => dispatch({ type: TYPES.CLEAR_CART });

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button onClick={cleanCart}>Limpiar Carrito</button>
        {cart?.map((item, index) => (
          <CartItem
            key={index}
            data={item}
            delOneFromCart={delOneFromCart}
            delAllFromCart={delAllFromCart}
          />
        ))}
      </article>
    </div>
  );
};

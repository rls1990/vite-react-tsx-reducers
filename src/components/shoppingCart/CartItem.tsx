import { Product } from "../../reducers/shoppingReducer";

interface CartItemProps {
  data: Product;
  delOneFromCart: (id: number) => void;
  delAllFromCart: (id: number) => void;
}

export const CartItem = ({
  data,
  delOneFromCart,
  delAllFromCart,
}: CartItemProps) => {
  const { id, name, price, quantity } = data;
  return (
    <div style={{ borderBottom: "thin solid gray", padding: "1rem" }}>
      <h4>{name}</h4>
      <h5>
        {quantity && (
          <>
            ${price}.00 x {quantity} = ${price * quantity}.00
          </>
        )}
      </h5>
      <button onClick={() => delOneFromCart(id)}>Eliminar Uno</button>

      <button onClick={() => delAllFromCart(id)}>Eliminar Todos</button>
    </div>
  );
};

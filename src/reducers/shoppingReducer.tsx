import { ShoppingAction, TYPES } from "../actions/shoppingActions";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface ShoppingState {
  products: Product[];
  cart: Product[];
}

export const shoppingInitialState: ShoppingState = {
  products: [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
    { id: 3, name: "Producto 3", price: 300 },
    { id: 4, name: "Producto 4", price: 400 },
    { id: 5, name: "Producto 5", price: 500 },
    { id: 6, name: "Producto 6", price: 600 },
  ],
  cart: [],
};

export const shoppingReducer = (
  state: ShoppingState,
  action: ShoppingAction
) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      const productItem = state.products.find(
        (product) => product.id === action.payload
      );

      const cartItem = state.cart.find((cart) => cart.id === productItem?.id);

      return cartItem
        ? {
            ...state,
            cart: state.cart.map((el) =>
              el.id === productItem?.id
                ? { ...el, quantity: el.quantity && el.quantity + 1 }
                : el
            ),
          }
        : productItem //important
        ? {
            ...state,
            cart: [...state.cart, { ...productItem, quantity: 1 }],
          }
        : state;
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      const cart =
        action.payload && state.cart.find((item) => item.id === action.payload);

      return cart && cart.quantity && cart.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity && item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((el) => el.id !== action.payload),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((el) => el.id !== action.payload),
      };
    }
    case TYPES.CLEAR_CART: {
      return shoppingInitialState;
    }
    default:
      return state;
  }
};

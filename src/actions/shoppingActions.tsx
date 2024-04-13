export enum TYPES {
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
}

export interface ShoppingAction {
  type: TYPES;
  payload?: number;
}

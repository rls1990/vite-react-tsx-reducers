export enum TYPES {
  INCREMENT,
  INCREMENT_5,
  DECREMENT,
  DECREMENT_5,
  RESET,
}

export interface CountAction {
  type: TYPES;
  payload: number;
}

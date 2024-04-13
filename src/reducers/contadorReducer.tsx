import { CountAction, TYPES } from "../actions/contadorActions";

export interface CountState {
  count: number;
}

export const countInitialState: CountState = {
  count: 0,
};

export const contadorReducer = (
  state: CountState,
  action: CountAction
): CountState => {
  switch (action.type) {
    case TYPES.INCREMENT:
      return { count: state.count + 1 };
    case TYPES.INCREMENT_5:
      return { count: state.count + action.payload };
    case TYPES.RESET:
      return countInitialState;
    case TYPES.DECREMENT:
      return { count: state.count - 1 };
    case TYPES.DECREMENT_5:
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

import { useReducer } from "react";

interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

const init = (initialState: CountState): CountState => {
  return { count: initialState.count + 10 };
};

enum CountActionKind {
  INCREMENT = "increment",
  INCREMENT_5 = "increment_5",
  DECREMENT = "decrement",
  DECREMENT_5 = "decrement_5",
  RESET = "RESET",
}

interface CountAction {
  type: string;
  payload: number;
}

const reducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case CountActionKind.INCREMENT:
      return { count: state.count + 1 };
    case CountActionKind.INCREMENT_5:
      return { count: state.count + action.payload };
    case CountActionKind.RESET:
      return initialState;
    case CountActionKind.DECREMENT:
      return { count: state.count - 1 };
    case CountActionKind.DECREMENT_5:
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

export const Contador = () => {
  //const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState, init);

  //   const sumar = () => setCount(count + 1);
  //   const restar = () => setCount(count - 1);

  const sumar = () => dispatch({ type: CountActionKind.INCREMENT, payload: 1 });
  const sumar_5 = () =>
    dispatch({ type: CountActionKind.INCREMENT_5, payload: 5 });
  const reset = () => dispatch({ type: CountActionKind.RESET, payload: 0 });
  const restar = () =>
    dispatch({ type: CountActionKind.DECREMENT, payload: 1 });
  const restar_5 = () =>
    dispatch({ type: CountActionKind.DECREMENT_5, payload: 5 });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Contador Reducer</h2>
      <nav>
        <button onClick={restar_5}>-5</button>
        <button onClick={restar}>-</button>
        <button onClick={reset}>0</button>
        <button onClick={sumar}>+</button>
        <button onClick={sumar_5}>+5</button>
      </nav>
      <h3>{state.count}</h3>
    </div>
  );
};

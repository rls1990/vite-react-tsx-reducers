import { useReducer } from "react";
import {
  contadorReducer,
  countInitialState,
} from "../../reducers/contadorReducer";
import { TYPES } from "../../actions/contadorActions";

export const ContadorMejorado = () => {
  const [state, dispatch] = useReducer(contadorReducer, countInitialState);

  const sumar = () => dispatch({ type: TYPES.INCREMENT, payload: 1 });
  const sumar_5 = () => dispatch({ type: TYPES.INCREMENT_5, payload: 5 });
  const reset = () => dispatch({ type: TYPES.RESET, payload: 0 });
  const restar = () => dispatch({ type: TYPES.DECREMENT, payload: 1 });
  const restar_5 = () => dispatch({ type: TYPES.DECREMENT_5, payload: 5 });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Contador Mejorado Reducer</h2>
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

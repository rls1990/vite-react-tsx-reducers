import { CrudAction, TYPES } from "../actions/crudActions";

export interface Caballero {
  id: string;
  name: string;
  constelation: string;
}

interface CrudState {
  db: Caballero[] | null;
}

export const crudInitialState: CrudState = {
  db: null,
};

export const crudReducer = (state: CrudState, action: CrudAction) => {
  switch (action.type) {
    case TYPES.READ_ALL_DATA: {
      return {
        ...state,
        db: action.payload && action.payload.map((data: any) => data),
      };
    }
    case TYPES.CREATE_DATA: {
      return { ...state, db: state.db && [...state.db, action.payload] };
    }
    case TYPES.UPDATE_DATA: {
      console.log(action.payload);
      const newData: Caballero[] | null =
        state.db &&
        state.db.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );

      return { ...state, db: newData };
    }

    case TYPES.DELETE_DATA: {
      console.log(action.payload);
      const newData =
        state.db && state.db.filter((el) => el.id != action.payload);
      return { ...state, db: newData };
    }
    case TYPES.NO_DATA:
      return crudInitialState;
    default:
      return state;
  }
};

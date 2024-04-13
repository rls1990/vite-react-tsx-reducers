import { Caballero } from "../reducers/crudReducer";

export enum TYPES {
  CREATE_DATA,
  READ_ALL_DATA,
  //READ_ONE_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  NO_DATA,
}

export interface CrudAction {
  type: TYPES;
  payload?: any;
}

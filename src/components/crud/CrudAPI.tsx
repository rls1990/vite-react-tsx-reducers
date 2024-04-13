/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { ErrorReq, helpHttp } from "../../helpers/helpHttp";
import { Loader } from "../loader/Loader";
import { Message } from "../message/Message";
import {
  Caballero,
  crudInitialState,
  crudReducer,
} from "../../reducers/crudReducer";
import { TYPES } from "../../actions/crudActions";

// export type Caballero = {
//   id: number | null | string;
//   name: string;
//   constelation: string;
// };

//const initialDB: Caballero[] = [];

// eslint-disable-next-line react-refresh/only-export-components
export const initialDataToEdit: Caballero = {
  id: "",
  constelation: "",
  name: "",
};

export const CrudAPI = () => {
  //const [db, setDb] = useState<Caballero[] | null>(null);
  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const { db } = state;
  const [dataToEdit, setDataToEdit] = useState(initialDataToEdit);

  const [error, setError] = useState<null | ErrorReq>(null);
  const [loading, setLoading] = useState(false);

  const { get, post, put, del } = helpHttp();
  const url = "http://localhost:5000/caballeros";

  useEffect(() => {
    setLoading(true);
    //get(url).then((res) => !res.err && setDb(res));
    get(url).then((res) => {
      if (!res.err) {
        //setDb(res);
        dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
        setError(null);
      } else {
        //setDb(null);
        dispatch({ type: TYPES.NO_DATA });
        setError(res);
        console.log(res);
      }

      setLoading(false);
    });
  }, [url]);

  const createDate = (data: Caballero) => {
    data.id = Date.now() + "";

    const dataBI = JSON.stringify(data);

    const options: RequestInit = {
      body: dataBI,
      headers: { "content-type": "application/json" },
    };

    post(url, options).then((res) => {
      console.log(res);
      if (res && !res.err) {
        //if (db != null) setDb([...db, res]);
        dispatch({ type: TYPES.CREATE_DATA, payload: res });
      } else {
        setError(res);
      }
    });
  };

  const updateDate = (data: Caballero) => {
    if (db !== null) {
      const endpoint = `${url}/${data.id}`;

      const dataBI = JSON.stringify(data);

      const options: RequestInit = {
        body: dataBI,
        headers: { "content-type": "application/json" },
      };

      put(endpoint, options).then((res) => {
        console.log(res);
        if (!res.err) {
          // const newData: Caballero[] = db.map((el: any) =>
          //   el.id === data.id ? data : el
          // );
          //setDb(newData);
          dispatch({ type: TYPES.UPDATE_DATA, payload: data });
        } else {
          setError(res);
        }
      });
    }
  };

  const deleteData = (id: number) => {
    if (db !== null) {
      const isDelete = confirm(
        `¿Está seguro de eliminar el registro con el id ${id}?`
      );

      if (isDelete) {
        const endpoint = `${url}/${id}`;

        const options: RequestInit = {
          headers: { "content-type": "application/json" },
        };

        del(endpoint, options).then((res) => {
          console.log(res);
          if (!res.err) {
            //const newData = db.filter((el: any) => el.id != id);
            //setDb(newData);
            dispatch({ type: TYPES.DELETE_DATA, payload: id });
          } else {
            setError(res);
          }
        });
      } else return;
    }
  };

  return (
    <>
      <h2>Crud API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createDate}
          updateData={updateDate}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />

        {loading && <Loader />}
        {error && (
          <Message msg={`Error ${error.statustext}`} bgColor="#dc3545" />
        )}
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </>
  );
};

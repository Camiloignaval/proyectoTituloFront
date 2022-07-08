import Swal from "sweetalert2";
import { baseApi } from "../helpers/baseApi";
import { alertSwal } from "../helpers/swal";
import { fetchConToken } from "../hooks/fetch";
import { types } from "../types/types";
// import { types } from '../types/types'

export const starttranserencia = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "http://localhost:4000/api/user/pagotransferencia",
      datos,
      "POST"
    );
    const data = await resp.json();
    if (data.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: data.msg,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };
};

export const startBringPays = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`${baseApi}api/user/pagos${id}`);
    const {
      ok,
      data: { pagos, estado },
    } = await resp.json();
    const { estado_financiero } = estado[0];
    dispatch(setEstado(estado_financiero));
    dispatch(setPagos(pagos));
  };
};

const setEstado = (estado) => ({
  type: types.setEstadoFinanciero,
  payload: estado,
});

const setPagos = (pagos) => ({
  type: types.setPagos,
  payload: pagos,
});

export const getAforoPorDia = (date) => {
  return async () => {
    const resp = await fetchConToken(`${baseApi}api/user/aforo${date}`);
    const body = await resp.json();
    return body;
  };
};

export const getDaysOff = () => {
  return async () => {
    const resp = await fetchConToken(`${baseApi}api/user/dayoff`);
    const body = await resp.json();
    return body;
  };
};

export const getReserveHour = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken(`${baseApi}api/user/reserve${id}`);
    const body = await resp.json();
    if (body.ok) {
      dispatch(setReserve(body.response));
    } else {
      dispatch(setNoReserve());
    }
  };
};

const setNoReserve = () => ({
  type: types.setNoReserveHour,
  payload: datos,
});

export const deleteReserve = (id) => {
  console.log(id);
  return async (dispatch) => {
    const resp = await fetchConToken(
      `${baseApi}api/user/reserve`,
      { id },
      "DELETE"
    );
    const body = await resp.json();
    alertSwal(body.ok, body.message);
    if (body.ok) {
      dispatch(deletReserve());
    }
    console.log(body);
  };
};

const deletReserve = () => ({
  type: types.deleteReserveHour,
});

const setReserve = (datos) => ({
  type: types.setReserveHour,
  payload: datos,
});

export const reserveHour = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `${baseApi}api/user/reserve`,
      datos,
      "POST"
    );
    const data = await resp.json();
    if (data.ok) {
      dispatch(setReserve(data.response));
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: data.msg,
        showConfirmButton: true,
        timer: 1500,
      });
    }
    return data;
  };
};

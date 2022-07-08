/* eslint-disable camelcase */
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { baseApi } from "../helpers/baseApi";
import { alertSwal } from "../helpers/swal";
import { fetchConToken } from "../hooks/fetch";
import { types } from "../types/types";

export const startViewPending = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/requests");
    const data = await resp.json();
    dispatch(viewPending(data.datos));
  };
};

const viewPending = (datos) => ({
  type: types.viewRequest,
  payload: datos,
});

export const startViewClients = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/user");
    const data = await resp.json();
    dispatch(viewClients(data.datos));
  };
};

const viewClients = (clients) => ({
  type: types.viewClients,
  payload: clients,
});

export const startResponseRequest = (data) => {
  console.log(data);
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/requests",
      data,
      "PUT"
    );
    const body = await resp.json();
    if (body.ok) {
      if (data.accion === "rechazar") {
        dispatch(rejectRequest(data.id_usuario));
      } else {
        dispatch(aceptRequest(data.id_usuario));
      }
      await Swal.fire("Listo!", body.msg, "success");
    } else {
      Swal.fire("Error!", body.msg, "error");
    }
  };
};

const rejectRequest = (datos) => ({
  type: types.rejectRequest,
  payload: datos,
});
const aceptRequest = (datos) => ({
  type: types.aceptRequest,
  payload: datos,
});

export const startToggleBlock = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/block", datos, "PUT");
    const body = await resp.json();
    if (body.ok) {
      if (datos.bloquear) {
        dispatch(blockUser(datos));
      } else {
        dispatch(unblockUser(datos));
      }
    } else {
      Swal.fire("Error!", body.msg, "error");
    }
  };
};

const blockUser = (datos) => ({
  type: types.blockUser,
  payload: datos,
});

const unblockUser = (datos) => ({
  type: types.unblockUser,
  payload: datos,
});

// ingreso pago efectivo
export const startPagoPresencial = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/pagopresencial",
      datos,
      "PUT"
    );
    const body = await resp.json();
    if (body.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pago ingresado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
  // traer solicitudes de pago
};
export const startPayRequest = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/payrequest");
    const body = await resp.json();
    if (body.ok) {
      dispatch(listaPagos(body.datos));
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};

const listaPagos = (datos) => ({
  type: types.viewPayRequest,
  payload: datos,
});

export const payValidation = (data) => {
  const { id_pago } = data;
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/validatePay",
      { idPago: id_pago },
      "PUT"
    );
    const body = await resp.json();
    // console.log(body)
    if (body.ok) {
      dispatch(validatePay(id_pago));
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};

const validatePay = (datos) => ({
  type: types.validatePayRequest,
  payload: datos,
});

export const emailAtrasados = () => {
  return async () => {
    const resp = await fetchConToken(baseApi + "api/admin/pagosatrasados");
    const body = await resp.json();
    if (body.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};

export const guardarHorarios = (data) => {
  return async () => {
    const resp = await fetchConToken(
      baseApi + "api/admin/schedules",
      data,
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};
export const obtenerHorarios = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/schedules");
    const body = await resp.json();
    if (body.ok) {
      dispatch(savedSchedules(body.response));
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};
const savedSchedules = (datos) => ({
  type: types.savedSchedules,
  payload: datos,
});

export const guardarCausas = (data) => {
  return async () => {
    const resp = await fetchConToken(
      baseApi + "api/admin/hoursblock",
      data,
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      return body;
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};
export const obtenerCausas = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/hoursblock");
    const body = await resp.json();
    if (body.ok) {
      dispatch(obtainHorasBloqueadas(body.response));
      return body;
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};
export const eliminarCausa = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/hoursblock",
      data,
      "DELETE"
    );
    const body = await resp.json();
    if (body.ok) {
      dispatch(deleteHorasBloqueadas(data?.id_bloqueo));
      Swal.fire("Borrado", body.msg, "success");
      return body;
    } else {
      Swal.fire("Error!", body.msg, "error");
      console.log("error");
    }
  };
};

const obtainHorasBloqueadas = (datos) => ({
  type: types.obtainBLockHours,
  payload: datos,
});
const deleteHorasBloqueadas = (datos) => ({
  type: types.deleteBLockHours,
  payload: datos,
});

export const consultAssistance = (rut) => {
  return async () => {
    const resp = await fetchConToken(
      baseApi + "api/admin/consultassistance",
      { rut },
      "POST"
    );
    const body = await resp.json();
    console.log(body);
    if (body.ok) {
      alertSwal(true, body.msg, 2000);
      return body;
    } else {
      alertSwal(false, body.msg, 2000);
    }
  };
};

export const getReserves = (date) => {
  return async () => {
    const resp = await fetchConToken(`${baseApi}api/admin/reserves${date}`);
    const body = await resp.json();
    if (body.ok) {
    } else {
      alertSwal(false, body.msg, 2000);
    }
    return body;
  };
};

export const getRoutinesRequest = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(baseApi + "api/admin/routines");
    const body = await resp.json();
    if (body.ok) {
      dispatch(obtainRoutinesRequest(body.response));
    } else {
      alertSwal(false, body.msg, 2000);
    }
  };
};

const obtainRoutinesRequest = (datos) => ({
  type: types.getRoutinesRequest,
  payload: datos,
});

export const proccessRoutine = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/routines",
      data,
      "PUT"
    );
    const body = await resp.json();
    console.log(body);
    if (body.ok) {
      alertSwal(true, body?.msg, 2000);
      dispatch(removeRoutineRequest(data?.id));
    }
  };
};

const removeRoutineRequest = (id) => ({
  type: types.removeRequestRoutine,
  payload: id,
});

// endpoint personal
export const sendRoutine = (data) => {
  return async () => {
    const resp = await fetchConToken(
      baseApi + "api/personal/routine",
      data,
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      alertSwal(true, body.msg, 2000);
    } else {
      alertSwal(false, "Ha ocurrido un error", 2000);
    }
    return body;
  };
};

export const changeLvL = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      baseApi + "api/admin/changelevel",
      data,
      "PUT"
    );
    const body = await resp.json();
    if (body.ok) {
      alertSwal(true, body.msg, 2000);
      dispatch(changeLvLCliente(data));
    } else {
      alertSwal(false, "Ha ocurrido un error", 2000);
    }
    return body;
  };
};
const changeLvLCliente = (datos) => ({
  type: types.changeLvl,
  payload: datos,
});

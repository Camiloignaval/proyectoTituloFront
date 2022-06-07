import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../hooks/fetch";
import { types } from "../types/types";

export const startRegister = (datos) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "http://localhost:4000/api/auth/user",
      datos,
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      dispatch(enviarSolicitud());
      await Swal.fire("Bien!", body.msg, "success");
    } else {
      Swal.fire("Error!", body.msg, "error");
    }
  };
};

export const cambiarRegistroFalse = () => ({
  type: types.resetRegister,
});

const enviarSolicitud = () => ({
  type: types.sendRequest,
});

export const startLogin = (datos) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "http://localhost:4000/api/auth/",
      datos,
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      dispatch(login(body.data));
      localStorage.setItem("token", body.token);
    } else {
      Swal.fire("Error!", body.msg, "error");
    }
  };
};

export const startCheking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("http://localhost:4000/api/auth/renew/");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      dispatch(login(body.data));
      dispatch(checkingFinish());
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.finishChecking,
});

const login = (datos) => ({
  type: types.login,
  payload: datos,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.logout,
});

export const startEditProfile = () => {
  return async (dispatch) => {
    dispatch(editProfile());
  };
};

const editProfile = () => ({
  type: types.editProfileOn,
});

export const startUploadImg = (datos) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "http://localhost:4000/api/auth/imgPerfil/",
      datos,
      "PUT"
    );
    const body = await resp.json();
    if (body.ok) {
      dispatch(uploadImg(datos.url));
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};

const uploadImg = (url) => ({
  type: types.editImg,
  payload: url,
});

export const startUpdateProfile = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "http://localhost:4000/api/auth/user/",
      data,
      "PUT"
    );
    const body = await resp.json();

    if (body.ok) {
      dispatch(updateProfile(data));
      Swal.fire({
        position: "center",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};

const updateProfile = (data) => ({
  type: types.updateProfile,
  payload: data,
});

export const cancelEdit = () => (dispatch) =>
  dispatch({ type: types.cancelUpdate });

export const startBajaCuenta = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      `http://localhost:4000/api/auth/user/`,
      data,
      "DELETE"
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
      localStorage.clear();
      dispatch(logout());
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};
export const startChangePass = () => (dispatch) =>
  dispatch({ type: types.startChangePass });

export const endChangePass = () => (dispatch) =>
  dispatch({ type: types.cancelChangePass });

export const sendChangePass = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "http://localhost:4000/api/auth/pass",
      data,
      "PUT"
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
      dispatch({ type: types.cancelChangePass });
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};

// enviar mensaje
export const sendMessage = (data) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "http://localhost:4000/api/msg/intercambioMsg",
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
      dispatch({ type: types.cancelChangePass });
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};

export const startViewRoutines = () => {
  return async (dispatch) => {
    const resp = await fetchConToken(`http://localhost:4000/api/auth/routine`);
    const body = await resp.json();
    if (body.ok) {
      dispatch(getRoutines(body.response));
    } else {
      Swal.fire("oh oh!", body.msg, "error");
    }
  };
};

const getRoutines = (rutinas) => ({
  type: types.getRoutines,
  payload: rutinas,
});

import { types } from "../types/types";

const initialState = {
  registro: false,
  info: {
    id_usuario: null,
    nombre: null,
    apellido: null,
    fecha_nacimiento: null,
    email: null,
    rut: null,
    id_cargo: null,
    foto: null,
    telefono: null,
    estado_financiero: null,
    id_rutina: null,
  },
  pagos: [],
  active: false,
  editMode: false,
  checking: true,
  changePass: false,
  haveReserve: false,
  datosReserve: {},
  rutinasDisponibles: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.sendRequest:
      return {
        ...state,
        registro: true,
      };
    case types.resetRegister:
      return {
        ...state,
        registro: false,
      };
    case types.login: {
      return {
        ...state,
        info: action.payload,
        active: true,
      };
    }
    case types.logout: {
      return initialState;
    }
    case types.editProfileOn: {
      return {
        ...state,
        editMode: true,
      };
    }
    case types.uploadImg: {
      return {
        ...state,
        foto: action.payload,
      };
    }
    case types.updateProfile: {
      return {
        ...state,
        info: {
          ...state.info,
          telefono: action.payload.telefono,
          email: action.payload.email,
        },
        editMode: false,
      };
    }
    case types.cancelUpdate: {
      return {
        ...state,
        editMode: false,
      };
    }
    case types.finishChecking: {
      return {
        ...state,
        checking: false,
      };
    }
    case types.cancelChangePass: {
      return {
        ...state,
        changePass: false,
      };
    }
    case types.startChangePass: {
      return {
        ...state,
        changePass: true,
      };
    }
    case types.editImg: {
      return {
        ...state,
        info: {
          ...state.info,
          foto: action.payload,
        },
      };
    }
    case types.setEstadoFinanciero: {
      return {
        ...state,
        info: {
          ...state.info,
          estado_financiero: action.payload,
        },
      };
    }

    case types.setPagos: {
      return {
        ...state,
        pagos: action.payload,
      };
    }
    case types.setReserveHour: {
      return {
        ...state,
        haveReserve: true,
        datosReserve: action.payload,
      };
    }
    case types.deleteReserveHour: {
      return {
        ...state,
        haveReserve: false,
        datosReserve: {},
      };
    }
    case types.getRoutines: {
      return {
        ...state,
        rutinasDisponibles: action.payload,
      };
    }
    case types.deleteButtonDeleteRequest: {
      return {
        ...state,
        rutinasDisponibles: state.rutinasDisponibles.map((r) => {
          if (r.id_rutina === action.payload) {
            return { ...r, fechaSolEliminacion: new Date() };
          } else {
            return r;
          }
        }),
      };
    }
    case types.deleteRoutine: {
      return {
        ...state,
        rutinasDisponibles: state.rutinasDisponibles.filter(
          (r) => r?.id_rutina !== action.payload
        ),
      };
    }
    case types.activateRutine: {
      return {
        ...state,
        info: { ...state.info, id_rutina: action.payload },
      };
    }

    default:
      return state;
  }
};

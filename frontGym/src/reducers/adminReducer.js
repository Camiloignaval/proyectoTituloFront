/* eslint-disable eqeqeq */
import { types } from "../types/types";

const initialState = {
  clientes: [],
  solicitudes: [],
  payRequest: [],
  schedules: [],
  blockHours: [],
  routinesRequest: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.viewRequest:
      return {
        ...state,
        solicitudes: action.payload,
      };
    case types.viewClients:
      return {
        ...state,
        clientes: action.payload,
      };
    case types.aceptRequest: {
      return {
        ...state,
        clientes: [
          ...state.clientes,
          state.solicitudes.find((sol) => sol.id_usuario === action.payload),
        ],
        solicitudes: state.solicitudes.filter(
          (sol) => sol.id_usuario !== action.payload
        ),
      };
    }
    case types.rejectRequest: {
      return {
        ...state,
        solicitudes: state.solicitudes.filter(
          (sol) => sol.id_usuario !== action.payload
        ),
      };
    }
    case types.blockUser:
      return {
        ...state,
        clientes: state.clientes.map((c) => {
          if (c.id_usuario == action.payload.id_usuario) {
            c.bloqueado = true;
            return c;
          }
          return c;
        }),
      };
    case types.unblockUser:
      return {
        ...state,
        clientes: state.clientes.map((c) => {
          if (c.id_usuario == action.payload.id_usuario) {
            c.bloqueado = false;
            return c;
          }
          return c;
        }),
      };
    case types.viewPayRequest:
      return {
        ...state,
        payRequest: action.payload,
      };
    case types.validatePayRequest:
      return {
        ...state,
        payRequest: state.payRequest.filter(
          (p) => p.id_pago !== action.payload
        ),
      };

    case types.savedSchedules:
      return {
        ...state,
        schedules: action.payload,
      };
    case types.obtainBLockHours:
      return {
        ...state,
        blockHours: action.payload,
      };
    case types.deleteBLockHours:
      return {
        ...state,
        blockHours: state.blockHours.filter(
          (p) => p.id_bloqueo_hora !== action.payload
        ),
      };
    case types.getRoutinesRequest:
      return {
        ...state,
        routinesRequest: action.payload,
      };
    case types.removeRequestRoutine:
      return {
        ...state,
        routinesRequest: state?.routinesRequest.filter(
          (p) => p.id_rutina !== action.payload
        ),
      };
    case types.changeLvl:
      return {
        ...state,
        clientes: state?.clientes.map((c) => {
          if (p.id_usuario == action.payload.id_usuario) {
            p.nivel = action.payload.nivel;
            return c;
          }
          return c;
        }),
      };
    default:
      return state;
  }
};

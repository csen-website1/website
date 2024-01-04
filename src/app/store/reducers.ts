// reducers.ts
import { Reducer } from "redux";

// Define the shape of the state
interface AppState {
  error: string | null;
  state: boolean;
  text: string;
}

// Define the initial state
const initialState: AppState = {
  error: null,
  state: false,
  text: "",
};

// Define actions with their types
interface SetErrorAction {
  type: "SET_ERROR";
  payload: string; // The payload can be the error message
}

interface SetStateAction {
  type: "SET_STATE";
  payload: boolean; // The payload can be the new state
}

interface SetTextAction {
  type: "SET_TEXT";
  payload: string; // The payload can be the new text
}

// Define a union type for all possible actions
type AppAction = SetErrorAction | SetStateAction | SetTextAction;

// Create the reducer function
const appReducer: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_STATE":
      return {
        ...state,
        state: action.payload,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;

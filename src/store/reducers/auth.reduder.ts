import {
  ActionReducerMapBuilder,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";

import { removeAccessToken, setAccessToken } from "../../utilities/token.util";
import { loginAction, logoutAction } from "../actions/auth.action";

export interface AuthState {
  isAuthenticated: boolean;
}
const initState: AuthState = {
  isAuthenticated: false,
};

const authReducer: ReducerWithInitialState<AuthState> = createReducer(
  initState,
  (builder: ActionReducerMapBuilder<AuthState>) =>
    builder
      .addCase(
        loginAction,
        (state: AuthState, action: PayloadAction<string>): AuthState => {
          const token: string = action.payload;

          setAccessToken(token);

          return {
            ...state,
            isAuthenticated: true,
          };
        }
      )
      .addCase(logoutAction, (state: AuthState): AuthState => {
        removeAccessToken();

        return {
          ...state,
          isAuthenticated: false,
        };
      })
);

export default authReducer;

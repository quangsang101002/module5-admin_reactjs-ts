import { createAction } from '@reduxjs/toolkit';
import { PayloadActionCreator } from '@reduxjs/toolkit/src/createAction';

const loginAction: PayloadActionCreator<string> = createAction('AUTH_LOGIN');

const logoutAction: PayloadActionCreator<undefined> = createAction('AUTH_LOGOUT');

export { loginAction, logoutAction };

import * as authActions from "./actions";
import { AuthAPI } from "../../API";
import {AUTH_SUCCESS_MOBILE_STEP} from "./actions";

export const authStart = () => ({
  type: authActions.AUTH_START,
});

export const authSuccess = (user) => ({
  type: authActions.AUTH_SUCCESS,
  user,
});

export const authSuccessLastStep = (user) => ({
    type: authActions.AUTH_SUCCESS_LAST_STEP,
    user,
});

export const authSuccessMobileStep = (user) => ({
    type: authActions.AUTH_SUCCESS_MOBILE_STEP,
    user,
});

export const authRegisterSuccess = (user) => ({
    type: authActions.AUTH_REGISTRATION_SUCCESS,
    user,
});

export const basicProfileCompleted = (user) => ({
    type: authActions.AUTH_BASIC_PROFILE_SUCCESS,
    user,
});

export const authFail = (error) => (dispatch) => {
  dispatch({
    type: authActions.AUTH_FAIL,
    error,
  });
};


export const authLogin =
  (username, password, registerType, history) => async (dispatch) => {
    try {
      dispatch(authStart());
      const user = await AuthAPI.login(username, password, registerType);
        if(user.phoneNumberConfirmed === false) {
            dispatch(authSuccessMobileStep(user))
            return history.push({
                pathname: '/auth/verify-mobile',
                state: { userId: user.id },
            });
        } else if(user.emailConfirmed === true && user.basicProfile) {
          dispatch(authSuccess(user));
          if (user.role === 'panelist') {
              history.push("/panelist/dashboard");
          } else {
              history.push("/admin/dashboard-admin");
          }
      } else if(user.basicProfile === null && user.emailConfirmed === true){
          dispatch(authSuccessLastStep(user));
          history.push("/auth/basic-profile");
      } else {
          dispatch(authRegisterSuccess(user));
          history.push("/verify-screen");
      }
    } catch (error) {
      dispatch(authFail(error.message));
    }
  };

export const authBasicProfile =
    (history, id, role) => async (dispatch) => {
        try {
            dispatch(authStart());
            let obj = { id, role }
            dispatch(basicProfileCompleted(obj));
            if (obj.role === 'panelist') {
                history.push("/panelist/dashboard");
            } else {
                history.push("/admin/dashboard-admin");
            }
        } catch (error) {
            dispatch(authFail(error.message));
        }
    };

export const authRegistration =
    (data, history) => async (dispatch) => {
      try {
        dispatch(authStart());
        const user = await AuthAPI.registration(data);
        dispatch(authRegisterSuccess(user));
              return history.push({
                  pathname: '/auth/verify-mobile',
                  state: { userId: user.userId },
              });
      } catch (error) {
        dispatch(authFail(error.message));
      }
    };

import * as authActions from "./actions";
import { AuthAPI } from "../../API";

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
      if(user.emailConfirmed === true && user.basicProfile) {
          dispatch(authSuccess(user));
          history.push("/");
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
    (history, id) => async (dispatch) => {
        try {
            console.log('Calling Basvi Profile======>>')
            dispatch(authStart());
            let obj = { id }
            dispatch(basicProfileCompleted(obj));
            history.push("/");
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
          history.push("/verify-screen");
      } catch (error) {
          console.log('error---->', error)
        dispatch(authFail(error.message));
      }
    };

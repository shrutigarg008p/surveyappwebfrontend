import * as authActions from './actions';

const initialState = {
  adminUser: {
    isAuthenticated: false,
    token: null,
    firstName: null,
    lastName: null,
    roleName: null,
    expiry: null,
    loading: false,
    error: null,
  },
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case authActions.AUTH_START: {
      return {
        ...initialState,
        adminUser: { ...initialState.adminUser, loading: true },
      };
    }
    case authActions.AUTH_SUCCESS: {
      const adminUser = {
        isAuthenticated: true,
        token: action.user.token,
        userId: action.user.id,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        roleName: action.user.roleName,
        loading: false,
        error: null,
      };
      return { ...state, adminUser };
    }

    case authActions.AUTH_REGISTRATION_SUCCESS: {
      const adminUser = {
        isAuthenticated: false,
        loading: false,
        error: null,
      };
      return { ...state, adminUser };
    }
    case authActions.AUTH_FAIL: {
      return {
        ...initialState,
        adminUser: {
          ...initialState.adminUser,
          error: action.error,
        },
      };
    }
    default: {
      return state;
    }
  }
};

import * as authActions from './actions';

let user = localStorage.getItem('persist:root');
user = JSON.parse(user); 
let adminUser; 
if(user && user.hasOwnProperty('adminUser')){
   adminUser = user.adminUser; 
}
else{
  adminUser = {
    isAuthenticated: false,
    token: null,
    firstName: null,
    lastName: null,
    roleName: null,
    expiry: null,
    loading: false,
    error: null,
    language: null
  }
}

console.log(adminUser); 
const initialState = {
  adminUser: adminUser
};

export const authReducers = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authActions.AUTH_START: {
      return {
        ...initialState,
        adminUser: {
          ...initialState.adminUser,
          loading: true,
          language: state.adminUser.language
        },
      };
    }
    case authActions.AUTH_SUCCESS: {
      const adminUser = {
        isAuthenticated: true,
        isBasicProfile: false,
        token: action.user.token,
        userId: action.user.id,
        role: action.user.role,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        roleName: action.user.roleName,
        language: state.adminUser.language,
        loading: false,
        error: null,
      };
      return { ...state, adminUser };
    }

    case authActions.AUTH_SUCCESS_LAST_STEP: {
      const adminUser = {
        isAuthenticated: true,
        isBasicProfile: true,
        token: action.user.token,
        userId: action.user.id,
        phoneNumber: action.user.phoneNumber,
        email: action.user.email,
        language: state.adminUser.language,
        loading: false,
        error: null,
      };
      return { ...state, adminUser };
    }

    case authActions.AUTH_SUCCESS_MOBILE_STEP: {
      console.log('state--->><><>', state, initialState, action.user.phoneNumber)
      const adminUser = {
        isAuthenticated: false,
        loading: false,
        error: null,
        phoneNumber: action.user.phoneNumber,
        language: state.adminUser.language
      };
      return { ...state, adminUser };
    }

    case authActions.AUTH_BASIC_PROFILE_SUCCESS: {
      const adminUser = {
        isAuthenticated: true,
        userId: action.user.id,
        role: action.user.role,
        isBasicProfile: false,
        language: state.adminUser.language,
        loading: false,
        error: null,
      };
      return { ...state, adminUser };
    }

    case authActions.LANGUAGE_CHANGE: {
      const adminUser = {
        ...state.adminUser,
       language: action.user
      };
      return { ...state, adminUser };
    }

    case authActions.AUTH_REGISTRATION_SUCCESS: {
      const adminUser = {
        isAuthenticated: false,
        loading: false,
        language: state.adminUser.language,
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
          language: state.adminUser.language,
        },
      };
    }
    default: {
      return state;
    }
  }
};

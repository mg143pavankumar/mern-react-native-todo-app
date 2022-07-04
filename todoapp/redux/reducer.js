import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },

    // Register reducer
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },

    // user details reducer
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },

    // logout reducer
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload.error;
    },

    // error reducer
    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const messageReducer = createReducer(
  {},
  {
    addTaskRequest: (state) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // update task reducer
    updateTaskRequest: (state) => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // delete task reducer
    deleteTaskRequest: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // update task reducer
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // update task reducer
    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // error reducer
    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);

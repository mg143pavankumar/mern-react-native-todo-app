import axios from "axios";

const serverUrl = "https://react-native-todo-app-server.herokuapp.com/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${serverUrl}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "loginFail", payload: err.response.data });
  }
};

// register user
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${serverUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "registerSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "registerFail", payload: err.response.data });
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.get(`${serverUrl}/logout`);

    dispatch({ type: "logoutSuccess" });
  } catch (err) {
    dispatch({ type: "logoutFail", payload: err.response.data });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${serverUrl}/profile`);

    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "loadUserFail", payload: err.response.data });
  }
};

export const addTask = (title, description) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(
      `${serverUrl}/newtask`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "addTaskSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "addTaskFail", payload: err.response.data });
  }
};

export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "updateTaskRequest" });

    const { data } = await axios.get(`${serverUrl}/task/${taskId}`);

    dispatch({ type: "updateTaskSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "updateTaskFail", payload: err.response.data });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskRequest" });

    const { data } = await axios.delete(`${serverUrl}/task/${taskId}`);

    dispatch({ type: "deleteTaskSuccess", payload: data });
  } catch (err) {
    dispatch({ type: "deleteTaskFail", payload: err.response.data });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (err) {
    dispatch({ type: "updateProfileFail", payload: err.response.data });
  }
};

// udpate password
export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });

      const { data } = await axios.put(
        `${serverUrl}/updatePassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "updatePasswordSuccess", payload: data.message });
    } catch (err) {
      dispatch({ type: "updatePasswordFail", payload: err.response.data });
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch({ type: "verificationRequest" });

    const { data } = await axios.post(
      `${serverUrl}/verifyAuth`,
      {
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "verificationSuccess", payload: data.message });
  } catch (err) {
    dispatch({ type: "verificationFail", payload: err.response.data });
  }
};

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CameraScreen,
  ChangePassword,
  ForgetPassword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  Verify,
} from "./screens";
import { Footer, Loader } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux/action";
import FogetPassword from "./screens/ForgetPassword";

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="profile" component={Profile} />

        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="verify"
          component={Verify}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="changepassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="forgetpassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="resetpassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;

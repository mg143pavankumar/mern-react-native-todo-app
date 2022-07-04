import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/action";

const ResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { loading, message, error } = useSelector((state) => state.message);

  const resetPasswordHandler = async () => {
    await dispatch(resetPassword(otp, newPassword));
    navigation.navigate("login");
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }

    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [message, dispatch, error, alert]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <Button
        disabled={!otp || !newPassword}
        style={styles.btn}
        loading={loading}
        onPress={resetPasswordHandler}
      >
        <Text style={{ color: "#fff" }}>Reset Password</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    marginTop: 10,
  },
});

export default ResetPassword;

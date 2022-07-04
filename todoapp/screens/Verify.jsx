import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadUser, verify } from "../redux/action";

const Verify = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const verifyHandler = async () => {
    await dispatch(verify(otp));
    dispatch(loadUser());
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>VERIFICATION</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <Button disabled={!otp} style={styles.btn} onPress={verifyHandler}>
        <Text style={{ color: "#fff" }}>Verify</Text>
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

export default Verify;

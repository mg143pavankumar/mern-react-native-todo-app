import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../redux/action";

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.message);

  const [email, setEmail] = useState("");

  const forgetHandler = async () => {
    await dispatch(forgetPassword(email));
    navigation.navigate("resetpassword");
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
      <Text style={{ fontSize: 20, margin: 20 }}>Forget Password</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Button
        disabled={!email}
        loading={loading}
        style={styles.btn}
        color="#fff"
        onPress={forgetHandler}
      >
        <Text style={{ color: "#fff" }}>Send Email</Text>
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

export default ForgetPassword;

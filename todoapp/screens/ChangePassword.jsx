import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/action";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    alert("Password changed successfully");
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
      <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <Button
        disabled={!oldPassword || !newPassword}
        style={styles.btn}
        onPress={changePasswordHandler}
      >
        <Text style={{ color: "#fff" }}>Change Password</Text>
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

export default ChangePassword;

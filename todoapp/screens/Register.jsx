import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";
import { register } from "../redux/action";
import mime from "mime";

const Register = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  const registerHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    if (password !== confirmPassword) {
      alert("Password and Confirm Password must be same");
    } else {
      dispatch(register(myForm));
    }
  };

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: false,
    });
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
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{
          backgroundColor: "#900",
          opacity: 0.8,
        }}
      />

      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900", marginVertical: 10 }}>Upload Photo</Text>
      </TouchableOpacity>

      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button
        disabled={!email || !password || !name}
        style={styles.btn}
        onPress={registerHandler}
      >
        <Text style={{ color: "#fff" }}>Register</Text>
      </Button>

      <Text style={{ marginTop: 20 }}>Or</Text>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text
          style={{
            color: "#900",
            height: 30,
            margin: 20,
            fontSize: 15,
          }}
        >
          Have an Account, Login
        </Text>
      </TouchableOpacity>
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
    marginVertical: 10,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    marginTop: 10,
  },
});

export default Register;

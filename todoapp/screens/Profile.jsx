import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../redux/action";
import mime from "mime";
import { Loader } from "../components";

const Profile = ({ navigation, route }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user.avatar.url);
  const [name, setName] = useState(user.name);

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: true,
    });
  };

  const updateProfileHandler = () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  return loading ? (
    <Loader />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{
          backgroundColor: "#900",
        }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text
          style={{
            color: "#900",
            marginVertical: 10,
          }}
        >
          Change Photo
        </Text>
      </TouchableOpacity>

      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <Button style={styles.btn} onPress={updateProfileHandler}>
          <Text style={{ color: "#fff" }}>Update</Text>
        </Button>

        <Button
          style={styles.btn1}
          onPress={() => navigation.navigate("changepassword")}
        >
          <Text style={{ color: "#fff" }}>Change Password</Text>
        </Button>

        <Button style={styles.btn2} onPress={logoutHandler}>
          <Text style={{ color: "#900" }}>Logout</Text>
        </Button>
      </View>
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
    width: "100%",
    marginTop: 10,
  },

  btn1: {
    backgroundColor: "#900",
    padding: 5,
    width: "100%",
    marginTop: 10,
  },

  btn2: {
    borderColor: "#900",
    padding: 5,
    width: "100%",
    marginTop: 10,
    borderWidth: 1.5,
  },
});

export default Profile;

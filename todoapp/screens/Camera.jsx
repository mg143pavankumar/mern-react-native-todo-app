import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  // console.log(route.params.updateProfile);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });

    if (route.params.updateProfile)
      return navigation.navigate("profile", { image: data.uri });
    else return navigation.navigate("register", { image: data.uri });
  };

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();
    if (route.params.updateProfile)
      return navigation.navigate("profile", { image: data.uri });
    else return navigation.navigate("register", { image: data.uri });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1, aspectRatio: 1 }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 20,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Icon
          name="image"
          size={40}
          color="#fff"
          onPress={openImagePickerAsync}
        />
        <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />

        <Icon
          name="flip-camera-android"
          size={40}
          color="#fff"
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CameraScreen;

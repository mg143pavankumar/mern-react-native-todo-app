import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Task } from "../components";
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";

const Home = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.message);

  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const hideDialog = () => {
    setOpenDialog(!openDialog);
  };

  const addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  });

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <SafeAreaView>
          <ScrollView>
            <Text style={styles.heading}>All Tasks</Text>
            {user &&
              user.tasks?.map((task) => (
                <Task
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.completed}
                  taskId={task._id}
                />
              ))}

            <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
              <Text>
                <Icon name="add-to-list" size={20} color="#900" />
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>

      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={hideDialog}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <Button
              disabled={!title || !description || loading}
              onPress={addTaskHandler}
            >
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: "center",
    backgroundColor: "#474747",
    color: "#fff",
    marginTop: 25,
  },

  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    marginVertical: 20,
    elevation: 5,
  },

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
});

export default Home;

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/todosSlice";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddTodo() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const listTodos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isComplited: false,
    };
    try {
      await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
      dispatch(addTodoReducer(newTodo));
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Task"
          placeholderTextColor={colors.marshland[100]}
          onChangeText={(text) => setName(text)}
        />
        {console.log(name)}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Date:</Text>
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          onChange={(event, selectedDate) => setDate(selectedDate)}
          textColor="#ffff"
          baseColor="white"
          accentColor="white"
          style={{ width: "80%" }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Today:</Text>
        <Switch
          value={isToday}
          onValueChange={(value) => {
            setIsToday(value);
          }}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={addTodo}>
        <Text>Done</Text>
      </TouchableOpacity>
      <Text style={{ color: colors.marshland[600] }}>
        If you disable today, the task will be considered as tomorrow
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.marshland[50],
  },
  container: {
    flex: 1,
    backgroundColor: colors.marshland[950],
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: colors.marshland[50],
  },
  input: {
    borderBottomColor: colors.marshland[600],
    borderBottomWidth: 1,
    width: "80%",
    color: colors.marshland[100],
  },
  btn: {
    marginTop: 40,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 11,
    backgroundColor: colors.marshland[200],
  },
});

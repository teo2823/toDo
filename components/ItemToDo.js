import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Checkbox from "./Checkbox";
import moment from "moment";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemToDo({ id, text, isCompleted, isToday, hour }) {
  const [localHour, setLocalHour] = useState(new Date(hour));
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleDelete = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(todos.filter((todo) => todo.id !== id))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const createTwoButtonAlert = () =>
  Alert.alert("Warning", "Are you sure to delete it?", [
    {
      text: "Cancel",
    },
    { text: "YES", onPress: handleDelete },
  ]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={isToday}
          hour={hour}
        />
        <View>
          <Text
            style={
              isCompleted
                ? [
                    styles.title,
                    {
                      textDecorationLine: "underline",
                      color: colors.marshland[800],
                    },
                  ]
                : styles.title
            }
          >
            {text}
          </Text>
          <Text
            style={
              isCompleted
                ? [
                    styles.hour,
                    {
                      textDecorationLine: "underline",
                      color: colors.marshland[800],
                    },
                  ]
                : styles.hour
            }
          >
            {moment(localHour).format("LT")}
          </Text>
        </View>
      </View>

      <View></View>
      <TouchableOpacity onPress={createTwoButtonAlert} style={styles.delete}>
        <Icon name="delete" size={20} color={colors.marshland[300]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {},
  title: {
    fontSize: 18,
    color: colors.marshland[200],
    fontWeight: "bold",
    marginBottom: 6,
  },
  hour: {
    fontWeight: "100",
    color: colors.marshland[50],
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";
import { updateTodoReducer } from "../redux/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkbox({ id, title, isCompleted, isToday, hour }) {
  const dispatch = useDispatch();
  const listTodos = useSelector(state => state.todos.todos)

  const handleCheckbox = () => {
    try {
      dispatch(updateTodoReducer({id, isCompleted}));
      AsyncStorage.setItem("@Todos", JSON.stringify(
        listTodos.map(todo => {
          if (todo.id == id) {
            return {...todo, isCompleted: !todo.isCompleted}
          } 
          return todo;
        })
      ))
    } catch (err) {
      console.log(err)
    }
  }

  return isToday ? (
    <TouchableOpacity onPress={handleCheckbox} style={isCompleted ? styles.checked : styles.unChecked}>
      {isCompleted && (
        <Icon name="check" size={20} color={colors.marshland[950]} />
      )}
    </TouchableOpacity>
  ) : (
    <View style={styles.isToday}/>
  );
}

const styles = StyleSheet.create({
  checked: {
    width: 24,
    height: 24,
    marginRight: 13,
    borderRadius: 6,
    borderColor: colors.marshland[300],
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.marshland[200],
    shadowColor: colors.marshland[0],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 24,
    height: 24,
    marginRight: 13,
    borderRadius: 6,
    borderColor: colors.marshland[300],
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.marshland[0],
    shadowColor: colors.marshland[0],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  isToday: {
    width: 15,
    height: 15,
    borderRadius: 10, 
    marginLeft: 5,
    marginRight: 15,
    backgroundColor: colors.marshland[200]
  }
});

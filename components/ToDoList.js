import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ItemToDo from "./ItemToDo";
import { colors } from "../theme/colors";

export default function ToDoList({toDosData }) {
  return (
    <View>
        <FlatList
          data={toDosData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ItemToDo {...item }/>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

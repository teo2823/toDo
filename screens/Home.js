import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";
import ToDoList from "../components/ToDoList";
import { toDosData } from "../data/todos";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { hideCompletedReducer, setTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {

  const todos = useSelector(state => state.todos.todos)

  // const [localData, setLocalData] = useState(
  //   toDosData.sort((a, b) => {
  //     return a.isCompleted - b.isCompleted;
  //   })
  // );
  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      try{
        const todos = await AsyncStorage.getItem("@Todos");
        if(todos !== null) {
          dispatch(setTodoReducer(JSON.parse(todos)));
        }
      }
      catch (err){
        console.log(err)
      }
    }
    getTodos()
  }, [])

  const handlePress = async () => {
    if(isHidden){
      setIsHidden(false)
      const todos = await AsyncStorage.getItem("@Todos");
      if(todos !== null){
        dispatch(setTodoReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(true)
    dispatch(hideCompletedReducer())
    // if (isHidden) {
    //   setIsHidden(false);
    //   setLocalData(toDosData.sort((a, b) => a.isCompleted - b.isCompleted));
    // } else {
    //   setIsHidden(!isHidden);
    //   setLocalData(localData.filter((todo) => !todo.isCompleted));
    // }
  };

  const handleAdd = () => {
    navigation.navigate("AddTodo")
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.marshland[950],
      paddingTop: Platform.OS === "android" && 10,
      paddingHorizontal: 10,
    }}>
      <View
        style={{flex: 1}}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcLuv_OQg6YtGIY1D8l6g8Ua6SI1TYXzMOw&usqp=CAU",
          }}
          style={styles.pic}
        />
        <View style={styles.containerTitle}>
          <Text style={styles.mainTitle}>Today</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{ color: "#3478f6" }}>
              {isHidden ? "Show Completed" : "Hide Completed"}
            </Text>
          </TouchableOpacity>
        </View>
        <ToDoList toDosData={todos.filter((todo) => todo.isToday)} />
        <Text style={styles.mainTitle}>Tomorrow</Text>
        <ToDoList toDosData={todos.filter((todo) => !todo.isToday)} />
        <TouchableOpacity style={styles.addButon} onPress={handleAdd}>
          <Icon name="plus-circle" size={50} color={colors.marshland[50]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pic: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.marshland[50],
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addButon: {
    position: "absolute",
    bottom: 50,
    right: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme/colors";
import ToDoList from "../components/ToDoList";
import { useCallback, useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { hideCompletedReducer, setTodoReducer } from "../redux/todosSlice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddPic from "./AddPic";

export default function Home() {
  const [userimg, setUserimg] = useState(null);
  const todos = useSelector((state) => state.todos.todos);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef(null);
  const snapPoints = ["25%"];
  const navigation = useNavigation();
  const route = useRoute();
  const selectedImage = route.params && route.params.selectedImage;
  const dispatch = useDispatch();
  const handleSnapPress = useCallback((index) => {
    setIsOpen(true);
    sheetRef.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("@Todos");
        if (todos !== null) {
          dispatch(setTodoReducer(JSON.parse(todos)));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, []);

  useEffect(() => {
    if (selectedImage || selectedImage == null) {
      setUserimg(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    const getStoredImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("@imgprofile");
        if (storedImage !== null) {
          setUserimg(JSON.parse(storedImage));
        }
      } catch (error) {
        console.log("Error fetching stored image: ", error);
      }
    };
    getStoredImage();
  }, []);

  const handlePress = async () => {
    if (isHidden) {
      setIsHidden(false);
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodoReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(true);
    dispatch(hideCompletedReducer());
  };

  const handleAdd = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.marshland[950],
          paddingTop: Platform.OS === "android" && 10,
          paddingHorizontal: 10,
        },
        isOpen && { backgroundColor: "rgba(0, 0, 0, 0.1" },
      ]}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => handleSnapPress(0)}>
          <Image
            source={userimg ? { uri: userimg } : require("../assets/user.jpeg")}
            style={styles.pic}
          />
        </TouchableOpacity>
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

      {isOpen && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <AddPic modalState={setIsOpen} />
          </BottomSheetView>
        </BottomSheet>
      )}
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

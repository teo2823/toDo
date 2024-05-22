import { SafeAreaView, View, StyleSheet, Platform } from "react-native";
import { colors } from "./theme/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import { store } from "./redux/storage";
import { Provider } from "react-redux";
import React from "react";
import Home from "./screens/Home";
import AddTodo from "./screens/AddTodo";
import AddPic from "./screens/AddPic";
import PhotoUser from "./screens/PhotoUser";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTodo" component={AddTodo} options={{presentation: "modal"}} />
          <Stack.Screen name="AddPic" component={AddPic} options={{presentation: "modal"}} />
          <Stack.Screen name="PhotoUser" component={PhotoUser} options={{presentation: "modal"}} />
        </Stack.Navigator>
      </NavigationContainer>    
    </Provider>
  );
}



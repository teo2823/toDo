import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PhotoUser() {
  const route = useRoute();
  const [userProfile, setUserProfile] = useState(null);
  const { userPhoto } = route.params;

  useEffect(() => {
    if (userPhoto) {
      setUserProfile(userPhoto);
    }
  }, [userPhoto]);

  useEffect(() => {
    const getStoredImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("@imgprofile");
        if (storedImage !== null) {
          setUserProfile(JSON.parse(storedImage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStoredImage();
  }, []);
  return (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: userProfile }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: "100%",
  },
});

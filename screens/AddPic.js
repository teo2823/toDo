import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setImage, deleteImage } from "../redux/imageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddPic({modalState}) {
  const [imageUser, setImageUser] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("@imgprofile");
        if (storedImage !== null) {
          setImageUser(true);
        }
      } catch (error) {
        console.log("Error fetching stored image: ", error);
      }
    };
    checkImage();
  }, []);

  const handleImgaePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      await AsyncStorage.setItem("@imgprofile", JSON.stringify(source.uri));
      dispatch(setImage(result.uri));
      navigation.navigate("Home", { selectedImage: source.uri });
      setImageUser(true);
      modalState(false);
    }
  };

  const handleDeletePic = async () => {
    dispatch(deleteImage());
    try {
      await AsyncStorage.removeItem("@imgprofile");
      setImageUser(false);
      navigation.navigate("Home", { selectedImage: null });
      modalState(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeePhoto = async () => {
    try {
      const storedImage = await AsyncStorage.getItem("@imgprofile");
      navigation.navigate("PhotoUser", { userPhoto: storedImage });
    } catch (err) {
      console.log(err);
    }
  };

  const buttonAlert = () =>
    Alert.alert("Warning", "Are you sure to delete it?", [
      {
        text: "Cancel",
      },
      { text: "YES", onPress: handleDeletePic },
    ]);

  return (
    <>
      {imageUser ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleSeePhoto}>
            <View style={styles.item}>
              <Icon
                name="account-box"
                size={20}
                color={colors.marshland[200]}
              />
              <Text style={styles.text}>See photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImgaePickerPress}>
            <View style={styles.item}>
              <Icon name="plus-box" size={20} color={colors.marshland[200]} />
              <Text style={styles.text}>Switch photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={buttonAlert}>
            <View style={styles.item}>
              <Icon
                name="delete-circle"
                size={20}
                color={colors.marshland[200]}
              />
              <Text style={styles.text}>Delete photo</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleImgaePickerPress}>
            <View style={styles.item}>
              <Icon name="plus-box" size={20} color={colors.marshland[200]} />
              <Text style={styles.text}>Add Image</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.marshland[900],
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: '100%'
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 7,
  },
  text: {
    color: colors.marshland[200],
    fontSize: 20,
  },
});

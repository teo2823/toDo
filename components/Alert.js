import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'

export default function Alert({message}) {
    const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  return (
    <View>
      <Text>Alert</Text>
    </View>
  )
}


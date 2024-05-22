import { Alert } from 'react-native';
import React from 'react';

export default function Alerta({ message, confirmMsj, func }) {
  Alert.alert(
    message,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'), // Aquí puedes poner cualquier acción que desees al presionar Cancel
        style: 'cancel',
      },
      { text: confirmMsj, onPress: () => func() }, // Aquí ejecutamos la función func cuando se presiona OK
    ],
    { cancelable: false }
  );
}


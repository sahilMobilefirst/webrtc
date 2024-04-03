import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,

} from 'react-native';

import WebviewPage from './src/screens/Web';
import HomeScreen from './src/screens/Home';

const Stack = createNativeStackNavigator();


const requestPermissions = async () => {
  try {
    const writeExternalStoragePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    const recordAudioPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );

    const foregroundServicePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE
    );

    if (
      writeExternalStoragePermission === PermissionsAndroid.RESULTS.GRANTED &&
      recordAudioPermission === PermissionsAndroid.RESULTS.GRANTED &&
      foregroundServicePermission === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('All permissions granted');
    } else {
      console.log('One or more permissions denied');
    }
  } catch (err) {
    console.warn(err);
  }
};



function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Webview" component={WebviewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;

import { PermissionsAndroid } from "react-native";

export const requestPermissions = async () => {
    try {
      const grantedWriteExternal = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your external storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      const grantedWriteInternal = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_INTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your internal storage.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      const grantedForegroundService = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE,
        {
          title: 'Foreground Service Permission',
          message: 'App needs access to run foreground services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      const grantedRecordAudio = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      if (
        grantedWriteExternal === PermissionsAndroid.RESULTS.GRANTED &&
        grantedWriteInternal === PermissionsAndroid.RESULTS.GRANTED &&
        grantedForegroundService === PermissionsAndroid.RESULTS.GRANTED &&
        grantedRecordAudio === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
      } else {
        console.log('One or more permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  // Call the function to request permissions
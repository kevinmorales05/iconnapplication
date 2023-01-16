import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Alert } from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log('Authorization status:', authStatus);
    //await messaging().registerDeviceForRemoteMessages();
    getCFMToken();
  } else {
    //console.log('not authorized!');
  }
}

async function getCFMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  //console.log(fcmtoken, 'old  notif token');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        //console.log('new notif token ', fcmtoken);
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      //console.log(error, 'error in fcmtoken');
    }
  }
}

const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    //Alert.alert(JSON.stringify(remoteMessage.notification.title), JSON.stringify(remoteMessage.notification.body));
    //console.log('Notification caused app to open from background state:', remoteMessage.notification);
    //navigation.navigate(remoteMessage.data.type);
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        //console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
      messaging().onMessage(async remoteMessage => {
        //console.log('Notification on forgraound state........', remoteMessage);
      });
    });
};

export { NotificationListener, requestUserPermission };

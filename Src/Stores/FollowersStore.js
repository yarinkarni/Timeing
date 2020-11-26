import { observable, action, computed } from 'mobx';
import { persist, create } from 'mobx-persist';
import PushNotification from "react-native-push-notification";

class FollowersStore {
  //משתנה שנשמר במכשיר
  @persist @observable userData = null

  //משתנה לוקאלי של האפליקציה
  @observable user = 'ron';
  @observable ScholarshipDetails = null;
  @observable news = [];
  @observable Token = 'yarin';
  // constructor() {
  //   //FirebaseApp.initializeApp();
  //   PushNotification.configure({
  //     onRegister: function (token) {
  //       this.Token = token;
  //       console.log("TOKEN:", token);
  //     },
  //     onNotification: function (notification) {
  //       console.log("NOTIFICATION:", notification);
  //       //notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },
  //     // onAction: function (notification) {
  //     //   console.log("ACTION:", notification.action);
  //     //   console.log("NOTIFICATION:", notification);
  //     // },
  //     // onRegistrationError: function (err) {
  //     //   console.error(err.message, err);
  //     // },
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true,
  //   });
  // }

  testPush = () => {
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
    });
  }
  testCancel = () => {
    PushNotification.cancelAllLocalNotifications()
  }
  testSchedule = () => {
    PushNotification.localNotificationSchedule({
      message: "My Notification Massege",
      data: new Date(Date.now() + 15 * 1000)
    });
  }
  //מחזיר משתנים
  @computed
  get getUser() {
    return this.user
  }
  @computed
  get getScholarshipDetails() {
    return this.ScholarshipDetails
  }
  get getToken() {
    return this.Token
  }
  //לשנות את המשתנה
  @action
  setUser(user) {
    this.user = user
  }
  @action
  setScholarshipDetails(ScholarshipDetails) {
    this.ScholarshipDetails = ScholarshipDetails
  }
  @action
  setToken(token) {
    this.Token = token
  }
}


const store = new FollowersStore();
export default store;
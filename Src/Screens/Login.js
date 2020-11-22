import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ImageBackground, StyleSheet, TextInput, Image, YellowBox } from 'react-native';

import { create } from 'mobx-persist';

import AsyncStorage from '@react-native-community/async-storage'
import FollowersStore from '../Stores/FollowersStore'
YellowBox.ignoreWarnings(['Remote debugger']);

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/';
// הבאת מיידע מהמכשיר
const hydrate = create({
  storage: AsyncStorage,
});
const GetHydrate = () => {
  hydrate('userData', FollowersStore).then(() =>
    console.log('Get data from store'),
    //testSchedule()
  );
}
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  componentDidMount = async () => {
    await GetHydrate()

  }

  txtchgEmail = (email) => {
    this.setState({ email });
  }
  txtchgPass = (password) => {
    this.setState({ password });
  }
  btnSignUp = async () => {
    this.props.navigation.navigate('Register', { user: s });
  }
  btnLogin = async () => {
    let s = await this.checkStudentDetils(this.state.email,this.state.password);
    console.log(s+"");
    if (s != null)
      this.props.navigation.navigate('Register', { user: s });
  }
  checkStudentDetils = async (email,password) => {
    let returnedObj = null;
    await fetch(url + `api/Users?email=${this.state.email}&password=${this.state.password}`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then(function (data) {
        if (data != null) {
          returnedObj = data;
        }
        else {
          alert("wrong ID!");
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });
    return returnedObj;
  }


  render() {
    return (
      <ImageBackground style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.SecondTopic}>כניסה</Text>
          <Image style={{ width: 100, height: 100 }} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholderTextColor="#000000"
              value={this.state.emailText} onChangeText={(text) => { this.txtchgEmail(text) }} placeholder='אימייל' />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholderTextColor="#000000"
              value={this.state.password} onChangeText={(text) => { this.txtchgPass(text) }} placeholder='סיסמא' />
          </View>
          <TouchableHighlight style={[styles.MainButton, styles.loginButton]} onPress={this.btnLogin}>
            <Text style={styles.loginText}>היכנס</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.MainButton, styles.loginButton]} onPress={this.btnLogin}>
            <Text style={styles.loginText}>היכנס</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "100%",
    width: "100%"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginRight: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 120,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  inner: {
    width: '70%',
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: "center",
    justifyContent: "center"
  },
  Topic: {
    paddingBottom: 50,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#66FFFF'
  },
  MyButtons: {
    flexDirection: 'row',

  },
  SecondTopic: {
    fontSize: 50,
    paddingBottom: 30,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  MainButton: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  }
});

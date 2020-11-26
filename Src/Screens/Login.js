import React, { Component } from 'react'
import { Alert, Text, View, TouchableHighlight, ImageBackground, StyleSheet, TextInput, Image } from 'react-native';

let url = 'http://site04.up2app.co.il/';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }


  txtchgEmail = (email) => {
    this.setState({ email });
  }
  txtchgPass = (password) => {
    this.setState({ password });
  }
  btnSignUp = async () => {
    this.props.navigation.navigate('Register');
  }
  btnLogin = async () => {
    let s = await this.checkStudentDetils(this.state.email, this.state.password);
    if (s !== null)
      this.props.navigation.navigate('ManagementPage', { user: s });
    else
      Alert.alert('האימייל או הסיסמא שגויים');
  }
  checkStudentDetils = async (email, password) => {
    if (email == '' || password == '') return null;
    let returnedObj = null;
    await fetch(url + `api/Users?email=${email}&password=${password}`,
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
          <TouchableHighlight style={[styles.MainButton, styles.loginButton]} onPress={this.btnSignUp}>
            <Text style={styles.loginText}>הירשם</Text>
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

    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  }
});

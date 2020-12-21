import React, { Component } from 'react'
import { Alert, Text, View, TouchableHighlight, ImageBackground, StyleSheet, TextInput, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

let url = 'http://site04.up2app.co.il/';
import { observer, inject } from 'mobx-react'
@inject("FollowersStore")
@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'karni@a.com',
      password: '123',
      picker: 'סטודנט',
    }
  }
  txtchgEmail = (email) => this.setState({ email });
  txtchgPass = (password) => this.setState({ password });
  btnSignUp = () => this.props.navigation.navigate('Register');
  btnLogin = async () => {
    if (this.state.picker === 'מנהל מלגה') {
      let s = await this.checkStudentDetilsForUser(this.state.email, this.state.password);
      if (s !== null) {
        this.props.navigation.navigate('ManagementPage');
        this.props.FollowersStore.setUser(s)
      }
      else
        Alert.alert('האימייל או הסיסמא שגויים');
    }
    else {
      let s = await this.checkStudentDetilsForStudnet(this.state.email, this.state.password);
      if (s !== null) {
        this.props.FollowersStore.setUser(s)

        this.props.navigation.navigate('Report', { user: s });
      }
      else
        Alert.alert('האימייל או הסיסמא שגויים');
    }
  }
  checkStudentDetilsForStudnet = async (email, password) => {
    if (email == '' || password == '') return null;
    let returnedObj = null;
    await fetch(url + `api/Students?email=${email}&password=${password}`,
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
  checkStudentDetilsForUser = async (email, password) => {
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
      <ImageBackground
        // source={require('../images/yarin.png')}
        style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.SecondTopic}>כניסה</Text>
          {/* <Image style={{ width: 100, height: 100 }} /> */}
          <TouchableHighlight
            style={[styles.MainButton, styles.loginButton]}
            onPress={this.btnSignUp}>
            <Text
              style={styles.loginText}
            >הירשם</Text>
          </TouchableHighlight>
          <View style={{ padding: 20 }}>
            <DropDownPicker
              items={[
                { label: 'סטודנט', value: 'סטודנט', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true },
                { label: 'מנהל מלגה', value: 'מנהל מלגה', icon: () => <Icon name="flag" size={18} color="#900" /> },
              ]}
              defaultValue={this.state.picker}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', width: 250, height: 100, position: 'relative' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                picker: item.value
              })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholderTextColor="#000000"
              value={this.state.email}
              onChangeText={(text) => { this.txtchgEmail(text) }}
              placeholder='אימייל' />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholderTextColor="#000000"
              value={this.state.password}
              onChangeText={(text) => { this.txtchgPass(text) }}
              placeholder='סיסמא'
              secureTextEntry={true}
            />
          </View>
          <View
          // style={styles.buttonContainer}
          >
            <TouchableHighlight style={[styles.MainButton, styles.loginButton]} onPress={this.btnLogin}>
              <Text style={styles.loginText}>היכנס</Text>
            </TouchableHighlight>
          </View>
          <View
          // style={styles.buttonContainer}
          >
          </View>
        </View>
      </ImageBackground >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#DCDCDC',
    backgroundColor: '#1E90FF',
    opacity: 0.7,
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
    textAlign: 'right'
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
    marginBottom: 30,
    width: 250,
    borderRadius: 30,
  }
});

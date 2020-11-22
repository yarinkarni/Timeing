import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: '',
      startTime: '',
      endTime: ''
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000)
  }
  btnStart = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    this.setState({ startTime: `${hours}:${minutes}:${seconds}` });
    // Alert.alert('1')
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const output =
    //       'latitude=' + position.coords.latitude +
    //       '\nlongitude=' + position.coords.longitude +
    //       '\naltitude=' + position.coords.altitude +
    //       '\nheading=' + position.coords.heading +
    //       '\nspeed=' + position.coords.speed
    //       Alert.alert(output);
    //   },
    //   (error) => Alert.alert(error.message),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }
  btnEnd = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    this.setState({ endTime: `${hours}:${minutes}:${seconds}` });
  }
  render() {
    return (
      <View style={[s.container,]}>
        <Text>
          {this.state.curTime}
        </Text>
        <Text style={s.stdTxt}>
          שלום
        </Text>
        <View style={{ flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'row' }}>
          <TouchableOpacity style={s.stdBtn} onPress={this.btnStart}>
            <Text style={s.stdTxt}>כניסה</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.stdBtn} onPress={this.btnEnd}>
            <Text style={s.stdTxt}>יציאה</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.stdBtn}>
            <Text style={s.stdTxt}>צפייה בשעות </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '70%', paddingTop: 40, justifyContent: 'space-around' }}>
          <Text style={s.stdTxt}>
            שעת כניסה : {this.state.startTime}
          </Text>
          <Text style={s.stdTxt} >
            שעת יציאה :  {this.state.endTime}
          </Text>
        </View>
      </View>
    )
  }
}
const s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "100%",
    width: "100%"
  },
  stdBtn: {
    height: 50,
    width: 150,
    // backgroundColor: 'gray',
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',

  },
  stdTxt: {
    fontSize: 20,
    fontFamily: 'Arial',

  }
})
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { observer, inject } from 'mobx-react'
@inject("FollowersStore")
@observer
export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentID: this.props.FollowersStore.getUser.StudentID,
      //ScholarshipID:this.props.user.user.id,
      curTime: '',//לא צריך
      startTime: '',
      endTime: '',
      startlatitude: 'unknown',
      startlongitude: 'unknown',
      endlatitude: 'unknown',
      endlongitude: 'unknown',
      list: [],
    };
  }
  componentDidMount = async () => {
    let returnedObj = null;
    await fetch(url + "getRequestsByStudentID/" + this.props.FollowersStore.getUser.StudentID,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then((data) => {
        if (data != null) {
          returnedObj = data;
          this.setState({ list: data });
        }
        else {
          alert("wrong ID!");
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });
    if (this.state.list.length == 0) {
      alert("אין מלגות שאושרו");
    }
  }
  btnStart = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    Geolocation.getCurrentPosition((info) => {
      this.setState({ startlatitude: info.coords.latitude })
      this.setState({ startlongitude: info.coords.longitude })
      console.log(this.state.startlatitude + ' this.state.startlatitude')
      console.log(this.state.startlongitude + ' this.state.startlongitude')
    })
    this.setState({ startTime: `${hours}:${minutes}:${seconds}` });
  }
  btnEnd = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    Geolocation.getCurrentPosition((info) => {
      this.setState({ endlatitude: info.coords.latitude })
      this.setState({ endlongitude: info.coords.longitude })
      console.log(this.state.endlatitude + ' this.state.endlatitude')
      console.log(this.state.endlongitude + ' this.state.endlongitude')
    })
    this.setState({ endTime: `${hours}:${minutes}:${seconds}` });
  }
  render() {
    return (
      <View style={[s.container,]}>
        <Text>
          {this.state.curTime}
        </Text>
        <Text style={s.stdTxt}>
          שלום {this.props.FollowersStore.getUser.firstname}
        </Text>
        <View style={{ flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'row' }}>
          <TouchableOpacity style={s.stdBtn} onPress={this.btnStart}>
            <Text style={s.stdTxt}>כניסה</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.stdBtn} onPress={this.btnEnd}>
            <Text style={s.stdTxt}>יציאה</Text>
            {/* propsStyle={shift == 'ערב'}isValid={checkValidEvening} */}
          </TouchableOpacity>

          <TouchableOpacity style={s.stdBtn} onPress={() => this.props.navigation.navigate('WatchingHours')}>
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
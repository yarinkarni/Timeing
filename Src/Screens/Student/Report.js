import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { observer, inject } from 'mobx-react'
let url = 'http://site04.up2app.co.il/';
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
      list1: [],
      list2: [],
      picker: '',
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
          console.log(data + 'list1 data')
          returnedObj = data;
          this.setState({ list1: data });
        }
        else {
          alert("wrong ID!");
          returnedObj = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });
    if (this.state.list1.length == 0) {
      alert("אין מלגות שאושרו");
    }
    let returnedObj2 = null;
    await fetch(url + "getScholarshipByUserID/" + this.props.FollowersStore.getUser.StudentID,
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
          console.log(data + 'list2 data')
          returnedObj2 = data;
          this.setState({ list2: data });
        }
        else {
          alert("wrong ID!");
          returnedObj2 = null;
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }
  btnStart = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    Geolocation.getCurrentPosition((info) => {
      this.setState({ startlatitude: info.coords.latitude })
      this.setState({ startlongitude: info.coords.longitude })
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
    })
    this.setState({ endTime: `${hours}:${minutes}:${seconds}` });
  }
  render() {
    console.log(this.state.list2.length + 'this.state.list2[0].FirstName')
    console.log(this.props.FollowersStore.getUser.StudentID + 'this.props.FollowersStore.getUser.StudentID')
    console.log(this.state.list1.length + 'this.state.list1.length')
    console.log(this.props.FollowersStore.getUser.FirstName + 'this.props.FollowersStore.getUser.FirstName')
    return (
      <View style={[s.container,]}>
        <Text>
          {this.state.curTime}
        </Text>
        <Text style={s.stdTxt}>
          שלום {this.props.FollowersStore.getUser.FirstName}
        </Text>
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
    backgroundColor: '#1E90FF',
    opacity: 0.7,
    // '#DCDCDC',
    height: "100%",
    width: "100%"
  },
  stdBtn: {
    height: 50,
    width: 150,
    backgroundColor: '#00BFFF',
    //  'gray',
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',

  },
  stdTxt: {
    fontSize: 20,
    fontFamily: 'Arial',
    color: 'white'
  }
})
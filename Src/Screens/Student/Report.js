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
      scholarshipByStudent: [],
      list2: [],
      selectedScholorships: null,
      scholarships: this.props.FollowersStore.getScholorships
    };
  }
  componentDidMount = async () => {
    const { FollowersStore } = this.props
    await this.getScholorshipsByStudent()
    console.log("FollowersStore.getReportData", FollowersStore.getReportData)
    FollowersStore.getReportData && this.setState({ ...FollowersStore.getReportData })

  }

  getScholorshipsByStudent = async () => {
    console.log(" this.props.FollowersStore.getUser.StudentID", this.props.FollowersStore.getUser.StudentID)
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
        if (data.length) {
          console.log("data", data)
          this.props.FollowersStore.setScholarshipByStudent(data)
        }
        else {
          console.log("wrong ID!");
        }
        this.setState({ scholarshipByStudent: data.length ? data : [] });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  btnStart = () => {

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let reportData = {}
    Geolocation.getCurrentPosition((info) => {
      console.log("info", info)

      reportData = {
        startlatitude: info.coords.latitude,
        startlongitude: info.coords.longitude,
        startTime: `${hours}:${minutes}:${seconds}`
      }
    console.log("SDSKSDKDSKSD")

    this.props.FollowersStore.setReportData(reportData)


      this.setState({
        startlatitude: info.coords.latitude,
        startlongitude: info.coords.longitude,
        startTime: `${hours}:${minutes}:${seconds}`
      })
    })
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
    this.setState({ endTime: `${hours}:${minutes}:${seconds}`,startTime:null });
    console.log("BLABLA")
    this.props.FollowersStore.setReportData(null)

  }

  filterScholarshipsByStudentID = (scholarships) => {
    const { scholarshipByStudent } = this.state
    let newScholarshipByStudent = []
    scholarships.forEach(s => {
      if (scholarshipByStudent.findIndex(a => a.ScholarshipID == s.ScholarshipID) != -1) {
        let newS = s
        newS["label"] = s.NameOfTheScholarship
        newScholarshipByStudent.push(newS)
      }

    });
    return newScholarshipByStudent
  }

  render() {
    const { endTime, startTime, scholarships, scholarshipByStudent, selectedScholorships } = this.state
    const getActiveScholarships = this.filterScholarshipsByStudentID(scholarships)
    console.log("RENDER - - - -.getReportData", this.props.FollowersStore.getReportData)

    return (
      <View style={[s.container]}>
        <View style={{}}>
          <Text>
            {this.state.curTime}
          </Text>
          <Text style={s.stdTxt}>
            שלום {this.props.FollowersStore.getUser.FirstName}
          </Text>
          <View style={[{ padding: 20 }, startTime && { opacity: 0.7 }]}>
            <DropDownPicker
              items={getActiveScholarships}
              disabled={startTime ? true : false}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', width: 250, height: 100, position: 'relative' }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => {
                this.setState({
                  selectedScholorships: item
                })
              }}
            />
          </View>


        </View>
        {(selectedScholorships|| this.props.FollowersStore.getReportData) ?
          <View>
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-around', flexDirection: 'row' }}>
              <TouchableOpacity style={[s.stdBtn, startTime && { backgroundColor: 'red' }]} onPress={startTime ? this.btnEnd : this.btnStart}>
                <Text style={[s.stdTxt]}>{startTime ? 'יציאה' : 'כניסה'}</Text>
              </TouchableOpacity>



              <TouchableOpacity style={s.stdBtn} onPress={() => this.props.navigation.navigate('WatchingHours')}>
                <Text style={s.stdTxt}>צפייה בשעות </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '70%', paddingTop: 40, justifyContent: 'space-around' }}>
              <Text style={s.stdTxt}>
                שעת כניסה : {startTime}
              </Text>
              <Text style={s.stdTxt} >
                שעת יציאה :  {endTime}
              </Text>
            </View>
          </View>

          :
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>אנא בחר מילגה.</Text>
          </View>

        }
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
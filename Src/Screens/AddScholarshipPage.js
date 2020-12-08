import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import InputOutline from 'react-native-input-outline';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react'
let url = 'http://site04.up2app.co.il/';
@inject("FollowersStore")
@observer
export default class AddScholarshipPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ScholarshipID: 0,
      IsActive: true,
      UserID: this.props.FollowersStore.getUser.UserID,
      Conditions: '',
      NameOfTheScholarship: '',
      DueDate: '',
      Remarks: ''
    };
  }

  txtchgConditions = (Conditions) => this.setState({ Conditions });
  txtchgNameOfTheScholarship = (NameOfTheScholarship) => this.setState({ NameOfTheScholarship });
  txtchgDueDate = (DueDate) => this.setState({ DueDate });
  txtchgRemarks = (Remarks) => this.setState({ Remarks });
  btnAddScholarship = async () => {
    console.log("נתונים"+this.state.ScholarshipID+ this.state.IsActive+ this.state.UserID+ this.state.Conditions+ this.state.NameOfTheScholarship+ this.state.DueDate+ this.state.Remarks)
    let s = await this.AddScholarship(this.state.ScholarshipID, this.state.IsActive, this.state.UserID, this.state.Conditions, this.state.NameOfTheScholarship, this.state.DueDate, this.state.Remarks);
    console.log('returned value=' + s[0]);
    if (s == null) {
      alert('didnt inserted into db!');
    }
    else {
      this.props.navigation.navigate('ManagementPage');
    }
  }
  AddScholarship = async (ScholarshipID, IsActive, UserID, Conditions, NameOfTheScholarship, DueDate, Remarks) => {
    let returnedObj = null;
    let obj2Send = {
      "ScholarshipID": ScholarshipID,
      "IsActive": IsActive,
      "UserID": UserID,
      "Conditions": Conditions,
      "NameOfTheScholarship": NameOfTheScholarship,
      "DueDate": DueDate,
      "Remarks": Remarks
    }
    await fetch(url + 'addScholarship',
      {
        method: 'POST',
        body: JSON.stringify(obj2Send),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      })
      .then((resp) => resp.json())
      .then(function (data) {
        if (!data.toString().includes("could not insert")) {
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
      <View style={styles.container}>
        <View>
          <Text>Add Scholarship</Text>
        </View>
        <InputOutline
          style={styles.inputContainer}
          placeholder="תנאים"
          focusedColor='blue'
          defaultColor='grey'
          value={this.state.firstName}
          onChangeText={(text) => { this.txtchgConditions(text) }}
        />
        <InputOutline
          style={styles.inputContainer}
          placeholder="שם המלגה"
          focusedColor='blue'
          defaultColor='grey'
          value={this.state.firstName}
          onChangeText={(text) => { this.txtchgNameOfTheScholarship(text) }}
        />
        <InputOutline
          style={styles.inputContainer}
          placeholder="תאריך להגשה"
          focusedColor='blue'
          defaultColor='grey'
          value={this.state.firstName}
          onChangeText={(text) => { this.txtchgDueDate(text) }}
        />
        <InputOutline
          style={styles.inputContainer}
          placeholder="הערות"
          focusedColor='blue'
          defaultColor='grey'
          value={this.state.firstName}
          onChangeText={(text) => { this.txtchgRemarks(text) }}
        />
        <FontAwesome name="user-plus" size={120} style={styles.fab}
          onPress={this.btnAddScholarship}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    //borderBottomColor: '#F5FCFF',
    //backgroundColor: '#FFFFFF',
    //borderRadius: 30,
    //borderBottomWidth: 1,
    width: 250,
    //height: 45,
    //marginBottom: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginRight: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#0000FF",
  },
  loginText: {
    color: '#FFFFFF',
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
  Topic: {
    textAlign: 'center',
    margin: 20,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    alignSelf: 'center',
    bottom: 0,
  },
});

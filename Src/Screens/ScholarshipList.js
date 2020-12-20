import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Button, Text } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { YellowBox } from 'react-native';
import Modal from 'react-native-modal';
YellowBox.ignoreWarnings(['Remote debugger']);
let url = 'http://site04.up2app.co.il/';
import { observer, inject } from 'mobx-react'
@inject("FollowersStore")
@observer
export default class ScholarshipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: [],
      isModalVisible: false,
      index: 0
    }
  }
  toggleModal = (index) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, index });
    //console.log(this.state.index + 'this.state.index')
  };
  updateSearch = (search) => {
    //console.log(search + 'search')
    this.setState({ search });
  };
  componentDidMount = async () => {
    let returnedObj = null;
    await fetch(url + "getAllScholarships",
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
  }
  render() {
    //console.log(this.props.FollowersStore.getScholarshipDetails.ScholarshipID)
    const { search } = this.state;
    const { list } = this.state;
    var cards = [];
    for (let index = 0; index < list.length; index++) {
      cards.push(
        <Card key={list[index]?.ScholarshipID}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title={list[index]?.NameOfTheScholarship}
          />
          <CardTitle
            subtitle={list[index]?.Conditions}
          />
          <CardContent text={list[index]?.DueDate} />
          <CardAction
            separator={true}
            inColumn={false}>
            <CardButton
              onPress={
                // () => this.props.navigation.navigate('ScholarshipDetails', { ScholarshipDetails: list[index] })
                () => { this.toggleModal(index) }
              }
              title="פרטים"
              color="#FEB557"
            />
          </CardAction>
        </Card>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <ScrollView>
          {cards}
        </ScrollView>
        <FontAwesome name="user-plus" size={50} style={styles.fab}
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <View style={{ flex: 1 }}>
          {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text>Hello!</Text>
              <ScrollView>
                <View style={{
                  height: "100%",
                  width: "100%"
                }}>
                  <Card style={{ fontWeight: 'bold', fontSize: 30 }}>
                    <CardImage
                      source={{ uri: 'http://bit.ly/2GfzooV' }}
                      title={"שם ה​מ​​לגה : \n" + list[this.state.index]?.NameOfTheScholarship}
                    />
                    <CardTitle
                      style={styles.loginText}
                      subtitle={"תנאים : \n" + list[this.state.index]?.Conditions}
                    />
                    <CardContent text={"​מועד הגשה : \n" + list[this.state.index]?.DueDate} />
                    <CardContent text={"הערות : \n" + list[this.state.index]?.Remarks} />
                    <CardAction
                      separator={true}
                      inColumn={false}>
                      <CardButton
                        onPress={() => {
                          this.props.navigation.navigate('Login',);
                          this.toggleModal();
                          this.props.FollowersStore.setScholarshipDetails(list[this.state.index])
                        }}
                        title="הגש מועמדות"
                        color="#FEB557"
                      />
                    </CardAction>
                  </Card>
                </View>
              </ScrollView>
              <Button title="Hide modal" onPress={this.toggleModal} />
            </View>
          </Modal>
        </View>
      </View>
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
  fixedView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
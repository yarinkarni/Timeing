import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Button } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { create } from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage'
import FollowersStore from '../Stores/FollowersStore'
import { SearchBar } from 'react-native-elements';
// import { FAB } from 'react-native-paper';

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/';
// הבאת מיידע מהמכשיר
const hydrate = create({
  storage: AsyncStorage,
});
const GetHydrate = () => {
  hydrate('userData', FollowersStore).then(() =>
    console.log('Get data from store'),
  );
}
export default class ScholarshipList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: []
    }
  }
  updateSearch = (search) => {
    this.setState({ search });
  };
  componentDidMount = async () => {
    await GetHydrate()
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
              onPress={() => this.props.navigation.navigate('ScholarshipDetails', { ScholarshipDetails: list[index] })}
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
        {/* <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => this.props.navigation.navigate('Login')}
        /> */}
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
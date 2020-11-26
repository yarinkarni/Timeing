import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { FAB } from 'react-native-paper';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

let url = 'http://site04.up2app.co.il/';
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
        <FontAwesome name="user-plus" size={50} style={styles.fab} />
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
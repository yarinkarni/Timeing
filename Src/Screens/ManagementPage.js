import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import { FAB } from 'react-native-paper';
// import Fab from '@material-ui/core/Fab';
// import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
//import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';
let url = 'http://site04.up2app.co.il/';

export default class ManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Scholarship: []
    }
  }
  componentDidMount() {
    this.getAllScholarships();
  }
  getAllScholarships = async () => {
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
          this.setState({ Scholarship: data });
          console.log(this.state.Scholarship[0].NameOfTheScholarship)
        }
        else {
          returnedObj = null;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    const { Scholarship } = this.state;
    var cards = [];
    for (let index = 0; index < Scholarship.length; index++) {
      cards.push(
        <Card key={index}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title={Scholarship[index]?.NameOfTheScholarship}
          />
          <CardTitle
            subtitle={Scholarship[index]?.Conditions}
          />
          <CardContent text={Scholarship[index]?.DueDate} />
          <CardAction
            separator={true}
            inColumn={false}>
            {/* <DeleteForeverTwoTone /> */}

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
        <ScrollView>
          {cards}
        </ScrollView>
        <FontAwesome name="user-plus" size={50} style={styles.fab} />
        {/* <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        /> */}
      </View>
    );
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

import React, { Component } from 'react';
import { View, TextInput, ScrollView, YellowBox, Text, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import { FAB, DeleteForeverTwoTone } from 'react-native-paper';




YellowBox.ignoreWarnings([
  'Require cycle:'
])
//import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
// import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
// import IconButton from '@material-ui/core/IconButton';
let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site04/';

export default class ManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Scholarship: []
    }
  }
  componentDidMount() {
    //this.getAllScholarships();
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
            <DeleteForeverTwoTone />

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

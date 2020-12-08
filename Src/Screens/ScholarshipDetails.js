import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class ScholarshipDetails extends Component {
  render() {
    const { ScholarshipDetails } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Card style={{ fontWeight: 'bold', fontSize: 30 }}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title={"שם ה​מ​​לגה : \n" + ScholarshipDetails.NameOfTheScholarship}
          />
          <CardTitle
            style={styles.loginText}
            subtitle={"תנאים : \n" + ScholarshipDetails.Conditions}
          />
          <CardContent text={"​מועד הגשה : \n" + ScholarshipDetails.DueDate} />
          {/* <CardContent text={"הערות : \n"+ScholarshipDetails.DueDate} /> */}
          <CardAction
            separator={true}
            inColumn={false}>
            <CardButton
              onPress={() => this.props.navigation.navigate('Login')}
              title="הגש מועמדות"
              color="#FEB557"
            />
          </CardAction>
        </Card>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: "93%",
    width: "100%"
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
});
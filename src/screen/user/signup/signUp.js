import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ImageBackground
} from 'react-native';
import Input from '../../../resuseableComponents/generic/input';
import CustomButton from '../../../resuseableComponents/generic/button';
import axios from 'axios';
import jsonserver from "../../../api/server"
export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      contact: '',
      city: '',
      address: '',
    };
  }
  signup() {
    jsonserver
      .post('user/signup', {
        first_name: this.state.firstname,
        last_name: this.state.lastname,

        email: this.state.email,
        password: this.state.password,
        contact: this.state.contact,
        city: this.state.city,
        address: this.state.address,
      })
      .then(response => {
        // console.log("response.data");
        if (typeof response.data.message != 'undefined')
          alert(response.data.message);
        this.props.setUserData(response.data.data);
        this.props.navigation.navigate('SIGNIN');
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground source={{ uri: "https://previews.123rf.com/images/vectorchoice/vectorchoice1605/vectorchoice160500095/57692765-vector-abstract-upholstery-dark-green-background-can-be-used-in-cover-design-book-design-website-bac.jpg" }}
          style={styles.main}>
          <KeyboardAvoidingView style={styles.innerView}>
            <Image
              source={{
                uri:
                  'https://logos.textgiraffe.com/logos/logo-name/Gulan-designstyle-summer-m.png',
              }}
              style={{ width: "95%", height: 150 }}
            />
            <ScrollView
              contentContainerStyle={{
                backgroundColor: 'white',
                // paddingVertical: 20,
                flex: 1,
                width: "95%",
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold' }}>User SignUp</Text>
              {/* <Input placeholder="Username" /> */}
              <Input
                placeholder="First Name"
                onChangeText={fname => this.setState({ firstname: fname })}
              />
              <Input
                placeholder="Last Name"
                onChangeText={lname => this.setState({ lastname: lname })}
              />
              <Input
                placeholder="Email"
                onChangeText={uemail => this.setState({ email: uemail })}
              />
              <Input
                placeholder="Password"
                onChangeText={upass => this.setState({ password: upass })}
                issecure={true}
              />
              <Input
                placeholder="Contact"
                onChangeText={ucontact => this.setState({ contact: ucontact })}
                key="numeric"
              />
              <Input
                placeholder="City"
                onChangeText={ucity => this.setState({ city: ucity })}
              />
              <Input
                placeholder="Address"
                onChangeText={uaddress => this.setState({ address: uaddress })}
              />

              <CustomButton buttontext="Register" onPress={() => this.signup()} />
              <Text
                style={{ marginTop: 20, color: 'blue' }}
                onPress={() => this.props.navigation.navigate('SIGNIN')}>
                Have an account? Login here
              </Text>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: 'green',
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

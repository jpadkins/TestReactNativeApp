// Imports
//------------------------------------------------------------------------------

'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';
import t from 'tcomb-form-native';
let Form = t.form.Form;

import validator from 'email-validator';
let Email = t.refinement(t.String, (str) => {
  return validator.validate(str);
});

// Root App
//------------------------------------------------------------------------------

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.navigator}
      initialRoute={{
        component: StartupScreen,
        title: 'Welcome to App',
        backButtonTitle: 'Back',
      }}/>
    );
  }
}

// StartupScreen
//------------------------------------------------------------------------------

class StartupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.showLoginScreen = this.showLoginScreen.bind(this);
    this.showSignupScreen = this.showSignupScreen.bind(this);
  }

  showLoginScreen(entry) {
    this.props.navigator.push({
      title: 'Log In',
      component: LoginScreen,
      passProps: {
        entry: entry
      }
    });
  }

  showSignupScreen(entry) {
    this.props.navigator.push({
      title: 'Sign Up',
      component: SignupScreen,
      passProps: {
        entry: entry
      }
    });
  }

  render() {
    return(
      <View style={{
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch',
        flexDirection: 'column',
      }}>
          <View
            style={{height: 50, flex: 1}}>
              <Text
                style={{textAlign: 'center', fontSize: 60, fontWeight: 'bold'}}>
                  LOGO
              </Text>
          </View>
          <View style={{flex: 4}}/>
          <View
            style={{height: 50, flex: 1, marginBottom: 10,
                    backgroundColor: 'skyblue'}}>
              <Text
                style={{textAlign: 'center', fontSize: 60, fontWeight: 'bold'}}
                onPress={(this.showLoginScreen)}>
                  Log In
              </Text>
          </View>
          <View style={{height: 50, flex: 1, backgroundColor: 'powderblue'}}>
              <Text
                style={{textAlign: 'center', fontSize: 60, fontWeight: 'bold'}}
                onPress={(this.showSignupScreen)}>
                  Sign Up
              </Text>
          </View>
      </View>
    );
  }
}

// LoginScreen
//------------------------------------------------------------------------------

let loginFormOptions = {
  fields: {
    email: {
      error: 'Please enter a valid email.',
      maxLength: 254,
    },
    password: {
      secureTextEntry: true,
      maxLength: 30,
      minLength: 8,
      error: 'Password must be 8-30 characters.'
    }
  }
}

let loginForm = t.struct({
  email: Email,
  password: t.String,
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    let value = this.refs.form.getValue();
    if (value) { console.log(value); }
  }

  render() {
    return(
      <View style={styles.container}>
          <Form
            ref='form'
            type={loginForm}
            options={loginFormOptions}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit}
            underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

// SignupScreen
//------------------------------------------------------------------------------

let signupFormOptions = {
  fields: {
    firstName: {
      label: 'First Name',
      error: 'Please enter a valid last name.',
      maxLength: 35,
    },
    lastName: {
      label: 'Last Name',
      error: 'Please enter a valid first name.',
      maxLength: 35,
    },
    email: {
      error: 'Please enter a valid email.',
      maxLength: 254,
    },
    password: {
      secureTextEntry: true,
      maxLength: 30,
      minLength: 8,
      error: 'Password must be 8-30 characters.'
    }
  }
}

let signupForm = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: Email,
  password: t.String,
});

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    let value = this.refs.form.getValue();
    if (value) { console.log(value); }
  }

  render() {
    return(
      <View style={styles.container}>
          <Form
            ref='form'
            type={signupForm}
            options={signupFormOptions}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit}
            underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

// Styles
//------------------------------------------------------------------------------

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('App', () => App);

import React from 'react';
import {View, Image, ScrollView, StyleSheet, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Formik} from 'formik';
import * as yup from 'yup';

import InputCard from '../../components/Input/InputCard';
import Button from '../../components/Button/Button';
import authErrorMessagesParse from '../../utils/authErrorMessagesParse';

const formikValues = yup.object().shape({
  usermail: yup.string(),
  password: yup.string(),
});

const Login = ({navigation}) => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '477327638699-08drje7r5jgfks2nta0troba3q2882m9.apps.googleusercontent.com',
    });
  }, []);

  async function onHandleFormLogin(values) {
    try {
      await auth().signInWithEmailAndPassword(values.usermail, values.password);
      navigation.navigate('RoomPage');
    } catch (error) {
      showMessage({
        duration: 1200,
        message: authErrorMessagesParse(error.code),
        type: 'danger',
      });
    }
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    try {
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('RoomPage');
    } catch (err) {
      console.log(err.code);
    }
  }
  const onHandleSign = () => {
    navigation.navigate('SignPage');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../aset/header.png')} />
      </View>
      <Formik initialValues={formikValues} onSubmit={onHandleFormLogin}>
        {({handleChange, handleSubmit, values}) => (
          <View style={styles.inner_container}>
            <InputCard
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              placeholder=" enter e-mail address"
              keyboardType="email-address"
              iconName="at"
            />
            <InputCard
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="enter your password"
              secureTextEntry={true}
              iconName="key"
            />
            {/* <InputCard placeholder="enter your password again" iconName="key" /> */}
            <Button title="Log In" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <Button title="Sign In" theme="secondary" onPress={onHandleSign} />
      <View style={styles.separator} />
      {Platform.OS === 'android' ? (
        <Button
          title="Sign In with Google"
          icon="google"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
      ) : null}
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48416C',
  },
  header: {margin: 10, alignSelf: 'center'},
  inner_container: {},
  separator: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
});

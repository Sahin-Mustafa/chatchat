import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import InputCard from '../../components/Input/InputCard';
import Button from '../../components/Button/Button';
import authErrorMessagesParse from '../../utils/authErrorMessagesParse';

const Sign = ({navigation}) => {
  async function signInFormik(formValues) {
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.useremail,
        formValues.password,
      );
      showMessage({
        duration: 1800,
        message: 'User created',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        duration: 1200,
        message: authErrorMessagesParse(error.code),
        type: 'danger',
      });
    }
  }
  const {handleChange, handleSubmit, values, touched, errors} = useFormik({
    initialValues: {useremail: '', password: '', repassword: ''},
    validationSchema: Yup.object().shape({
      useremail: Yup.string(),
      password: Yup.string(),
      repassword: Yup.string().when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Both password need to be the same',
        ),
      }),
    }),
    onSubmit: signInFormik,
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../aset/header.png')} />
      </View>
      <View style={styles.inner_container}>
        <InputCard
          value={values.useremail}
          onChangeText={handleChange('useremail')}
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
        <InputCard
          value={values.repassword}
          onChangeText={handleChange('repassword')}
          placeholder="enter your password again"
          secureTextEntry={true}
          iconName="key"
        />
        <Text style={styles.error}>{errors.repassword}</Text>
        <Button title="Sign In" theme="secondary" onPress={handleSubmit} />
      </View>
      <Button title="Log In" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};
export default Sign;

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
  error: {margin: 10, color: 'red'},
});

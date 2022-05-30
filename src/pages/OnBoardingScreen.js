import {NavigationHelpersContext} from '@react-navigation/native';
import React from 'react';
import {Text, Image, Button, StyleSheet, Dimensions} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const size = Dimensions.get('window');

// const skip = ({...props}) => {
//   return <Button title='Skip' {...props} />;
// };
const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      //SkipButtonComponent={skip}
      onSkip={() => navigation.replace('LoginPage')}
      onDone={() => navigation.navigate('LoginPage')}
      pages={[
        {
          backgroundColor: '#48416C',
          image: (
            <Image
              source={require('../aset/Screen1.png')}
              style={styles.image}
            />
          ),
          title: 'Enjoy',
          subtitle: 'Enjoy with your friends',
        },
        {
          backgroundColor: '#EDC18D',
          image: (
            <Image
              source={require('../aset/Screen2.png')}
              style={styles.image}
            />
          ),
          title: 'Share',
          subtitle: 'Share your thoughts in groups',
        },
        {
          backgroundColor: '#9AC1ED',
          image: (
            <Image
              source={require('../aset/Screen3.png')}
              style={styles.image}
            />
          ),
          title: "Let's Start",
          subtitle: '',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    width: size.width / 0.9,
    height: size.height / 3,
    resizeMode: 'contain',
  },
});

import {StyleSheet, Dimensions} from 'react-native';

const size = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1 / 2,
    height: size.height / 4,
    margin: 10,
    backgroundColor: '#EDC18D',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontSize: 30,
  },
});

import {StyleSheet} from 'react-native';

const base = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
  },
  text: {
    paddingVertical: 5,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default {
  icon: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 3,
    },
    icon: {
      position: 'absolute',
      left: 6,
      bottom: 8,
    },
  }),
  primary: StyleSheet.create({
    ...base,
    container: {
      ...base.container,
      backgroundColor: '#EDC18D',
    },
  }),
  secondary: StyleSheet.create({
    ...base,
    container: {
      ...base.container,
      backgroundColor: 'white',
    },
  }),
};

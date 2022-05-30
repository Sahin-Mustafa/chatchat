import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#EDC18D',
    borderRadius: 10,
    padding: 10,
  },
  inner_container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  user: {
    fontFamily: 'italic',
  },
  message_text: {
    fontSize: 20,
  },
});

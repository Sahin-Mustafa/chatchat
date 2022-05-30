import {StyleSheet, Dimensions} from 'react-native';
const size = Dimensions.get('window');
export default StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    marginHorizontal: 10,
  },
  container: {
    height: size.height / 4,
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input_container: {
    flex: 1,
  },
});

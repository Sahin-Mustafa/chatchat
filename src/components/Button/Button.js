import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Button.style';

const Button = ({title, onPress, theme = 'primary', icon}) => {
  return (
    <TouchableOpacity style={styles[theme].container} onPress={onPress}>
      {icon === 'google' ? (
        <View style={styles.icon.container}>
          <Icon style={styles.icon.icon} name={icon} size={25} />
          <Text style={styles[theme].text}>{title}</Text>
        </View>
      ) : (
        <Text style={styles[theme].text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
export default Button;

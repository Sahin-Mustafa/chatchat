import React from 'react';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//account-outline
//key-outline
//at

import styles from './InputCard.style';

const InputCard = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  iconName,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        style={styles.textinput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="white"
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      <Icon name={iconName} size={20} style={styles.icon} />
    </View>
  );
};

export default InputCard;

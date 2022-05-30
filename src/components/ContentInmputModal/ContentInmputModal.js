import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import Button from '../Button/Button';
import styles from './ContentInmputModal.style';

const ContentImputModal = ({isVisible, onClose, onSend, buttonTitle}) => {
  const [text, setText] = useState(null);
  const handleCreate = () => {
    if (!text) {
      return;
    }
    onSend(text);
    setText(null);
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput placeholder="create new room" onChangeText={setText} />
        </View>
        <Button title={buttonTitle} onPress={() => handleCreate(text)} />
      </View>
    </Modal>
  );
};
export default ContentImputModal;

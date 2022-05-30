import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './RoomsCard.style';

function RoomCard({data, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>
        {[
          data.roomName.length < 11
            ? `${data.roomName}`
            : `${data.roomName.substring(0, 10)}...`,
        ]}
      </Text>
    </TouchableOpacity>
  );
}

export default RoomCard;

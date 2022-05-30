import React from 'react';
import {View, Text} from 'react-native';
import {formatDistance, parseISO} from 'date-fns';

import styles from './MessageCard.style';

function MessageCard({message}) {
  const formatedDate = formatDistance(parseISO(message.date), new Date(), {
    addSuffix: true,
  });
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.user}>{message.username}</Text>
        <Text style={styles.user}>{formatedDate}</Text>
      </View>
      <Text style={styles.message_text}>{message.text}</Text>
    </View>
  );
}

export default MessageCard;

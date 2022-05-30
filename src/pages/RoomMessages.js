import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import parseContentData from '../utils/parseContentData';
import FLoatingButton from '../components/FloatingButton/FloatingButton';
import ContentImputModal from '../components/ContentInmputModal/ContentInmputModal';
import MessageCard from '../components/messageCard/MessageCard';

function RoomMessages({route}) {
  const [loading, setLoading] = React.useState(true);
  //console.log(route.params); {"id": "-N3G-NyVR7qH5y4zGdb9", "roomName": "Python"}
  const [isVisible, setIsVisible] = React.useState(false);
  const [messagesData, setMessagesData] = React.useState([]);

  const handleModaleTooggle = () => {
    setIsVisible(!isVisible);
  };

  function handleInputSend(content) {
    handleModaleTooggle;
    sendContent(content);
  }
  function sendContent(content) {
    const userMail = auth().currentUser.email;
    const contentObj = {
      text: content,
      username: userMail.split('@')[0],
      date: new Date().toISOString(),
    };
    database()
      .ref(`roomMessages/${route.params.id}/${route.params.roomName}/`)
      .push(contentObj);
  }

  React.useEffect(() => {
    database()
      .ref(`roomMessages/${route.params.id}/${route.params.roomName}/`)
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parseData = parseContentData(contentData || {});
        setMessagesData(parseData);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}) => <MessageCard message={item} />;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="white" />
      ) : (
        <>
          <View style={styles.header_container}>
            <Text style={styles.title}>{route.params.roomName} Room</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => auth().signOut()}>
              <Icon name="logout" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList data={messagesData} renderItem={renderItem} />
          <ContentImputModal
            isVisible={isVisible}
            onClose={handleModaleTooggle}
            onSend={handleInputSend}
            buttonTitle="Send"
          />
          <FLoatingButton iconName="plus" onPress={handleModaleTooggle} />
        </>
      )}
    </View>
  );
}

export default RoomMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48416C', //'#EDC18D',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    right: 10,
  },
});

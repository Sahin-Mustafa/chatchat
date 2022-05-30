import React from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import FLoatingButton from '../components/FloatingButton/FloatingButton';
import RoomCard from '../components/roomsCard/RoomsCard';
import ContentImputModal from '../components/ContentInmputModal/ContentInmputModal';
import parseContentData from '../utils/parseContentData';
import uuid from 'react-native-uuid';

const Login = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [roomList, setRoomList] = React.useState([]);
  const handleModdleTooggle = () => {
    setIsVisible(!isVisible);
  };

  function handleInputText(content) {
    handleModdleTooggle;
    handleCreateRooms(content);
  }

  function handleCreateRooms(content) {
    const contentObj = {
      roomName: content,
    };
    database().ref('rooms/').push(contentObj);
  }

  React.useEffect(() => {
    database()
      .ref('rooms/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        const parsedData = parseContentData(contentData || {});
        setRoomList(parsedData);
        setLoading(false);
        /* rommLİst = [
          {id: '-N3FXaA4siQwUypgadAG', roomName: 'Room1'},
          {id: '-N3FWafQvJTp3zW6Ccbs', roomName: 'Room2},
          {id: '-N3FParBBkgXnljF_Nqk', roomName: 'Room3'},
        ];*/
      });
  }, []);
  const goRoomMessages = item => {
    navigation.navigate('MessagePage', item);
  };
  const renderItem = ({item}) => (
    <RoomCard data={item} onPress={() => goRoomMessages(item)} />
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="white" />
      ) : (
        <>
          <FlatList data={roomList} renderItem={renderItem} numColumns={2} />
          <ContentImputModal
            isVisible={isVisible}
            onClose={handleModdleTooggle}
            onSend={handleInputText}
            buttonTitle="Create Room"
          />
          <FLoatingButton iconName="plus" onPress={handleModdleTooggle} />
        </>
      )}
    </View>
  );
};
export default Login;

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
});

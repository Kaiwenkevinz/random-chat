import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {store} from '../../store/store';
import {getProfileAsync, selectUser} from '../../store/userSlice';
import {useAppSelector} from '../../hooks/customReduxHooks';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import eventEmitter from '../../services/event-emitter';
import {EVENT_UPDATE_USER_PROFILE} from '../../services/event-emitter/constants';
import {userService} from '../../network/lib/user';
import {showToast, toastType} from '../../utils/toastUtil';
import {ImagePickerAvatar} from './ImagePickerAvatar';
import UserInfo from './UserInfo';
import {chatService} from '../../network/lib/message';

const Profile = () => {
  const userStore = useAppSelector(selectUser);
  const {user, status, token} = userStore;
  const navigation = useNavigation();

  useEffect(() => {
    store.dispatch(getProfileAsync());
    eventEmitter.on(EVENT_UPDATE_USER_PROFILE, () => {
      store.dispatch(getProfileAsync());
    });

    return () => {
      eventEmitter.off(EVENT_UPDATE_USER_PROFILE, () => {
        console.log('Event listener', EVENT_UPDATE_USER_PROFILE, 'removed');
      });
    };
  }, []);

  const onHandleNewAvatar = (imageUrl: string) => {
    console.log('new avatar url: ', chatService.getImageUrl(imageUrl));
    const newUser = {
      ...user,
      avatar_url: chatService.getImageUrl(imageUrl),
    };
    userService
      .updateUserProfile(newUser)
      .then(
        () => {
          eventEmitter.emit(EVENT_UPDATE_USER_PROFILE);
          showToast(toastType.SUCCESS, '', 'Update avatar successfully');
        },
        err => {
          showToast(toastType.ERROR, '', err.message);
        },
      )
      .catch(err => {
        console.log('onHandleNewAvatar err: ', err);
      });
  };

  return (
    <>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <ImagePickerAvatar
              pickerDisabled={false}
              avatarUrl={user.avatar_url}
              imageName={`${user.id}_avatar`}
              onConfirm={onHandleNewAvatar}
            />
            <UserInfo user={user} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('ProfileEdit', {
                  ...user,
                });
              }}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;

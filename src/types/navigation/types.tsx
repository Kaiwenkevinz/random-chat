/**
 * Define the types of navigation params here.
 */

import {User} from '../network/types';

export type RootStackParamList = {
  ChatRoom: {roomId: string; otherUserName: string; user: User};
};
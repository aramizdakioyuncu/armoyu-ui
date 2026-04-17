/**
 * Defines available socket events for Armoyu.
 * mirrored from @armoyu/core to ensure UI isolation
 */
export type SocketEvent = 
  | 'connect'
  | 'disconnect'
  | 'post'
  | 'post_delete'
  | 'post_like'
  | 'post_repost'
  | 'post_repost_count'
  | 'chat_message'
  | 'chat_typing'
  | 'typing'
  | 'notification';

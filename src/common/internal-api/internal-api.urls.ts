const IdDetailUrls = {
  // '1': '/v1/internal/analytics/users',
  // '2': '/v1/internal/analytics/orders',
  // '3': '/v1/internal/batch-subject-schedules',
  // batchSubjectId: '/v1/internal/batch-subjects',
  // batchId: '/v1/internal/batches',
  // // '6': '/v1/internal/books',
  // chapterId: '/v1/internal/chapters',
  // contentId: '/v1/internal/contents',
  // '9': '/v1/internal/coupons',
  // '10': '/v1/internal/doubts',
  fileId: '/v1/internal/files',
  // '12': '/v1/internal/messages/send-message',
  // '13': '/v1/internal/orders',
  // '14': '/v1/internal/orders/order-details',
  // '15': '/v1/internal/organizations/org-pref',
  // organizationId: '/v1/internal/organizations/details',
  // packageId: '/v1/internal/packages',
  // programId: '/v1/internal/programs',
  // '18': '/v1/internal/questions',
  // '19': '/v1/internal/sections',
  // '20': '/v1/internal/student-fee-mappings',
  // '21': '/v1/internal/sub-topics',
  // subjectId: '/v1/internal/subjects',
  // testCategoryId: '/v1/internal/test-category',
  // // '24': '/v1/internal/tests/result',
  // testId: '/v1/internal/tests',
  // // '26': '/v1/internal/tests/test-student-mapping',
  // topicId: '/v1/internal/topics',
  // typeId: '/v1/internal/type',
  userId: '/v1/internal/users',
  // '30': '/v1/internal/users/fetch-user',
  // '31': '/v1/internal/users/create-student',
};
Object.freeze(IdDetailUrls);

const VideoUrls = {
  youtube: '/v1/internal/videos/youtube', //accepts urls
  vimeo: '/v1/internal/videos/vimeo', //accepts urls
  penpencilvdo: '/v1/internal/videos/penpencil',
};
Object.freeze(VideoUrls);

// const OrgPrefsUrls = {
//   orgPrefs: '/v1/internal/organizations/preferences', //post,accepts organizationId,keys and schoolId
//   increasePrefValue: '/v1/internal/organizations/increase-pref-value', //put aaccepts organizationId,key,value and schoolId
// };
// Object.freeze(OrgPrefsUrls);

// const EmailsUrls = {
//   createMany: '/v1/internal/emails/create-many', //post,{emails}
// };
// Object.freeze(EmailsUrls);

// const MessagesUrls = {
//   createMany: '/v1/internal/messages/create-many', //post,{messages}
// };
// Object.freeze(MessagesUrls);

const ConversationUrl = {
  create: '/v1/internal/conversation', //post
  replaceMembers: '/v1/internal/conversation/replace-members', //put
  blockMember(conversationId: string, userId: string) {
    return `/v1/conversation/${conversationId}/block-member/${userId}`;
  },
  userUnreadConversation: '/v1/internal/conversation/user-unread-conversations', //post
};
Object.freeze(ConversationUrl);

const UserUrls = {
  // userAggregate: '/v1/internal/users/user-aggregate', //post, {query}
  createUser: '/v1/internal/users/create-user', //post
  updateUser(id: string) {
    return `/v1/internal/users/${id}/update-user`; //put
  },
  fetchUser: '/v1/internal/users/fetch-user',
  fetchFilterUsers: '/v1/internal/users/fetch-filter-user',
};
const OrdersUrls = {
  //   orderAggregate: '/v1/internal/orders/order-details-aggregate', //post,{query}
  // };
  // const BatchStudentsUrls = {
  //   batchStudentsAggregate: '/v1/internal/batch-students/aggregate', //post,{query}
  studentOrderCreate: '/v1/internal/orders/create-order-saarthi',
};

const FilesUrls = {
  // remoteSaveFile: '/v1/internal/files/remote-save-file', //post,returns {'saved': true, name,key,baseUrl,}
  // createCsvFromArray: '/v1/internal/files/create-csv-from-array', //post,{data,filepath} returns filePath
  create: '/v1/internal/files/create', //post {name, key, baseUrl, organization}
  updateRemoteFilebyId(fileId: string) {
    return `/v1/internal/files/update-remote-file/${fileId}`; //put
  },
};

const LiveKitUrls = {
  createRoom: '/admin-room/token',
  getMappings: '/admin-room/',
  getUserToken: '/user-mapping/get-token',
  closeRoom: '/admin-room/close-room',
  muteTrack: '/admin-room/mute-track',
  muteTrackAll: '/admin-room/mute-all-track',
  updatePermission: '/admin-room/update-permission',
  getAdminHistory: '/admin-room/admin-history',
  meetUrl: '/hundredms-admin/meet-url',
};

const HundredMsUrls = {
  createRoom: '/hundredms-admin/token-admin',
  getMappings: '/admin-room/',
  getUserToken: '/hundredms-admin/get-token',
  closeRoom: '/hundredms-admin/close-room',
  checkIsRoomLive(room_name) {
    return `/hundredms-admin/room/${room_name}/live-check`;
  },
  // muteTrack: '/admin-room/mute-track',
  // muteTrackAll: '/admin-room/mute-all-track',
  // updatePermission: '/admin-room/update-permission',
  // getAdminHistory: '/admin-room/admin-history',
};

const NotificationUrls = {
  subscribeTopic: '/v1/internal/notification/subscribe-topic', //post
  unSubscribeTopic: '/v1/internal/notification/unsubscribe-topic/', //post
};

export {
  IdDetailUrls,
  VideoUrls,
  // OrgPrefsUrls,
  // EmailsUrls,
  // MessagesUrls,
  UserUrls,
  // OrdersUrls,
  // BatchStudentsUrls,
  FilesUrls,
  // ConversationUrl,
  // LiveKitUrls,
  // HundredMsUrls,
  // NotificationUrls,
};

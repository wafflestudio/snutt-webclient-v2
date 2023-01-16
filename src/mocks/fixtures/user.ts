export const mockUsers = [
  {
    info: {
      isAdmin: false,
      regDate: '2019-02-05T07:12:55.970Z',
      notificationCheckedAt: '2022-12-28T10:51:17.530Z',
      email: 'woohm402@snu.ac.kr',
      local_id: 'woohm402',
      fb_name: null,
    },
    auth: { password: '1234', token: 't1' },
  },

  // 페이스북 유저
  {
    info: {
      isAdmin: false,
      regDate: '2019-02-05T07:12:55.970Z',
      notificationCheckedAt: '2022-12-28T10:51:17.530Z',
      email: 'dkwanm1@snu.ac.kr',
      local_id: null,
      fb_name: '김기완',
    },
    auth: { password: '1234', token: 't2' },
  },

  // 임시 유저
  {
    info: {
      isAdmin: false,
      regDate: '2019-02-05T07:12:55.970Z',
      notificationCheckedAt: '2022-12-28T10:51:17.530Z',
      local_id: null,
      fb_name: null,
    },
    auth: { password: 'test-password', token: 't3' },
  },
];

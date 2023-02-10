const PERMISSION_LIST = {
  user: {
    label: 'User',
    description: 'The default permission to sign up.'
  },
  master: {
    label: 'Master',
    description: 'Can do everything.'
  }
};

exports.getPermissionList = () => ({ ...PERMISSION_LIST });

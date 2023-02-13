const PERMISSION_LIST = {
  login: {
    label: 'Log In',
    description: 'Can log into website.'
  },
  editApplication: {
    label: 'Edit Application',
    description: 'Can create,edit,delete an application.'
  },
  editUser: {
    label: 'Edit User',
    description: 'Can update, delete, and read a user.'
  },
  banUser: {
    label: 'Ban User',
    description: 'Can update, delete, and read a user.'
  },
  user: {
    label: 'User',
    description: 'The default permission to sign up.'
  },
  master: {
    label: 'Master',
    description: 'Can do everything.'
  }
};

exports.getPermissions = () => Object.keys(PERMISSION_LIST);
exports.getPermissionList = () => ({ ...PERMISSION_LIST });

exports.validatePermissions = (parentArray, subsetArray) => {
  return subsetArray.every(el => {
    return parentArray.includes(el);
  });
};

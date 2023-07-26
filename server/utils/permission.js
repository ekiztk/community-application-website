const PERMISSION_LIST = {
  editApplication: {
    label: 'Edit Application',
    description: 'Can create,edit,delete an application.'
  },
  accessAllResponses: {
    label: 'Access All Responses',
    description: 'Can see all responses that are sent for the applications.'
  },
  editUser: {
    label: 'Edit User',
    description: 'Can update, delete, and read a user.'
  },
  editLogs: {
    label: 'Edit Logs',
    description: 'Can delete and read the logs.'
  },
  banUser: {
    label: 'Ban User',
    description: 'Can update, delete, and read a user.'
  },
  master: {
    label: 'Master',
    description: 'Can do everything.'
  }
};

exports.getPermissions = () => Object.keys(PERMISSION_LIST);
exports.getPermissionList = () => ({ ...PERMISSION_LIST });

exports.validatePermissions = async (parentArray, subsetArray) => {
  return subsetArray.every(el => {
    return parentArray.includes(el);
  });
};

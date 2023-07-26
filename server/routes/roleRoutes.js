const express = require('express');
const roleController = require('./../controllers/roleController');
const authController = require('./../controllers/authController');

const permER = 'editRoles';

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(permER));

router
  .route('/')
  .get(roleController.getAllRoles)
  .post(roleController.createRole);

router
  .route('/:id')
  .get(roleController.getRole)
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

module.exports = router;

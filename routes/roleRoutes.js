const express = require('express');
const roleController = require('./../controllers/roleController');
const authController = require('./../controllers/authController');

const router = express.Router();
const permToPerform = 'editRoles';

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(permToPerform));

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

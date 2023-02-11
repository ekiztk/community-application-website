const express = require('express');
const applicationController = require('./../controllers/applicationController');
const authController = require('./../controllers/authController');

const router = express.Router();

const permToPerform = 'editApplication';

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(applicationController.getAllApplications)
  .post(
    authController.restrictTo(permToPerform),
    applicationController.createApplication
  );

router
  .route('/:id')
  .get(applicationController.getApplication)
  .patch(
    authController.restrictTo(permToPerform),
    applicationController.updateApplication
  )
  .delete(
    authController.restrictTo(permToPerform),
    applicationController.deleteApplication
  );

module.exports = router;

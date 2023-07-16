const express = require('express');
const applicationController = require('./../controllers/applicationController');
const authController = require('./../controllers/authController');
const responseRouter = require('./responseRoutes');

const router = express.Router();

const permToPerform = 'editApplication';

//nested route to get all revelant responses
router.use('/:applicationId/responses', responseRouter);

router
  .route('/:id/isCollaborator')
  .post(authController.protect, applicationController.isCollaborator);

router
  .route('/')
  .get(applicationController.getAllApplications)
  .post(
    authController.protect,
    authController.restrictTo(permToPerform),
    applicationController.createApplication
  );

router
  .route('/:id')
  .get(applicationController.getApplication)
  .patch(
    authController.protect,
    authController.restrictTo(permToPerform),
    applicationController.updateApplication
  )
  .delete(
    authController.protect,
    authController.restrictTo(permToPerform),
    applicationController.deleteApplication
  );

module.exports = router;

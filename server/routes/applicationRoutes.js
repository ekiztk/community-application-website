const express = require('express');
const applicationController = require('./../controllers/applicationController');
const authController = require('./../controllers/authController');
const responseRouter = require('./responseRoutes');

const permEA = 'editApplication';

const router = express.Router();

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
    authController.restrictTo(permEA),
    applicationController.createApplication
  );

router
  .route('/:id')
  .get(applicationController.getApplication)
  .patch(
    authController.protect,
    authController.restrictTo(permEA),
    applicationController.updateApplication
  )
  .delete(
    authController.protect,
    authController.restrictTo(permEA),
    applicationController.deleteApplication
  );

module.exports = router;

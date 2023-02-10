const express = require('express');
const applicationController = require('./../controllers/applicationController');

const router = express.Router();

router
  .route('/')
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router
  .route('/:id')
  .get(applicationController.getApplication)
  .patch(applicationController.updateApplication)
  .delete(applicationController.deleteApplication);

module.exports = router;

//bunun crud işlemleri tamam

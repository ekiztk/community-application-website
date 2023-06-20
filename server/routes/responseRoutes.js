const express = require('express');
const responseController = require('./../controllers/responseController');
const authController = require('./../controllers/authController');

//:applicationId/responses
const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(responseController.getAllResponses)
  .post(responseController.createResponse);

router
  .route('/:id')
  .get(responseController.getResponse)
  .patch(responseController.updateResponse)
  .delete(responseController.deleteResponse);

module.exports = router;

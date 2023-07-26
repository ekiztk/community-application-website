const express = require('express');
const responseController = require('./../controllers/responseController');
const authController = require('./../controllers/authController');

const permAAR = 'accessAllResponses';

//:applicationId/responses
//:userId/responses
const router = express.Router({ mergeParams: true });

router.post('/hasResponse', responseController.canApply);

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

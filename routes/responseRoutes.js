const express = require('express');
const responseController = require('./../controllers/responseController');

const router = express.Router();

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

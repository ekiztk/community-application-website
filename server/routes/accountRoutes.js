const express = require('express');
const accountController = require('./../controllers/accountController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use((req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is under build!'
  });
});

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(accountController.getAllAccounts)
  .post(accountController.createAccount);

router
  .route('/:id')
  .get(accountController.getAccount)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;

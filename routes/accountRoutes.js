const express = require('express');
const router = express.Router();
const { addAccount, deleteAccount } = require('../controllers/accountController');

// Route thêm tài khoản
router.post('/add', addAccount);

// Route xóa tài khoản
router.delete('/delete/:id', deleteAccount);

module.exports = router;

const { Account } = require('../models');

// Thêm tài khoản
const addAccount = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newAccount = await Account.create({ username, email, password });
    return res.status(201).json({ message: 'Account created successfully', account: newAccount });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating account', error: error.message });
  }
};

// Xóa tài khoản
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await account.destroy();
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};

module.exports = { addAccount, deleteAccount };

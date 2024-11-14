import express from 'express';
import { renderHome } from '../controllers/HomeController.js';
import { renderAbout } from '../controllers/AboutController.js';
import { renderContact } from '../controllers/ContactController.js';
import * as UserController from '../controllers/UserController.js';
import { renderLogin, handleLogin } from '../controllers/LoginController.js';
import { checkAuth, checkAdmin, checkUser } from '../middlewares/authMiddleware.js';
import { getAllNhom } from '../controllers/NhomController.js';
import { getAllSanpham, getSanphamByNhom, getSanphamById } from '../controllers/SanphamController.js';


const router = express.Router();

// Routes không yêu cầu đăng nhập
router.get('/', renderHome);
router.get('/home', renderHome);
router.get('/about', renderAbout);
router.get('/contact', renderContact);

// Route cho quản lý người dùng - chỉ cho admin
router.get('/users', UserController.getUsers); // cho user
router.get('/users/:userid', checkUser, UserController.getUserById);

// Route cho tạo người dùng - cho người dùng chưa đăng nhập
router.get('/usersadd', checkAuth, UserController.renderCreateUser); // Cho cả người dùng chưa đăng nhập
router.post('/createuser', UserController.createUser); // Cho cả người dùng chưa đăng nhập

// Route cho cập nhật người dùng - cho user chỉ có thể cập nhật chính họ
router.get('/users/edit/:userid', checkUser, UserController.getupdateUser); // Hiển thị form cập nhật
router.post('/updateUser/:userid', checkUser, UserController.updateUser); // Xử lý cập nhật

// Route cho xóa người dùng - chỉ cho admin
router.get('/users/delete/:id', checkAdmin, UserController.deleteUser); // Chỉ admin

// Route cho đăng nhập
router.get('/login', renderLogin);
router.post('/checklogin', handleLogin);

// API routes
router.get('/api/users', UserController.apiGetUsers);
router.get('/api/users/:id', UserController.apiGetUserById);
router.post('/api/users', UserController.apiCreateUser);
router.put('/api/users/:id', UserController.apiUpdateUser);
router.delete('/api/users/:id', UserController.apiDeleteUser);
router.post('/api/login', UserController.apiLogin);
router.post('/api/logout', UserController.apiLogout);


// Routes cho nhóm
router.get('/api/nhom', getAllNhom); // Lấy danh sách tất cả các nhóm

// Routes cho sản phẩm
router.get('/api/sanpham', getAllSanpham); // Lấy danh sách tất cả sản phẩm
router.get('/api/sanpham/nhom/:idnhom', getSanphamByNhom); // Lấy sản phẩm theo nhóm
router.get('/api/sanpham/:masp', getSanphamById); // Lấy chi tiết sản phẩm

export default router;
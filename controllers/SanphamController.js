import db from '../config/db.js';

export const getAllSanpham = (req, res) => {
    const sql = 'SELECT * FROM sanpham';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.render('sanpham', { sanphamList: results });
    });
};

export const getSanphamByNhom = (req, res) => {
    const { idnhom } = req.params;
    const sql = 'SELECT * FROM sanpham WHERE idnhom = ?';
    db.query(sql, [idnhom], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        const nhom = { ten: results.length ? results[0].nhom : 'Không có sản phẩm' };
        res.render('sanpham', { sanphamList: results, nhom });
    });
};

export const getSanphamById = (req, res) => {
    const { masp } = req.params;
    const sql = 'SELECT * FROM sanpham WHERE masp = ?';
    db.query(sql, [masp], (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (results.length === 0) {
            return res.status(404).send('Sản phẩm không tồn tại');
        }
        res.render('sanphamDetail', { sanpham: results[0] });
    });
};
